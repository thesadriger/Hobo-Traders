import React, { useRef, useState } from 'react';
import Lottie from 'lottie-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import animationData from '/src/assets/animation_json/settings.json';
import { Modal, Button } from 'react-bootstrap';
import { ethers } from 'ethers';
import HTT_ABI from '/src/abi/HTT_ABI.json';
import HTT_ADDRESS from '/src/abi/HTT_address.json';

const SettingsContainer = styled.section`
  flex: 0 0 auto;
  width: ${({ theme }) => theme.sizes.avatarSize};
  aspect-ratio: 1/1;
  background-color: ${({ theme }) => theme.colors.settingsBackground};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: ${({ theme }) => theme.sizes.avatarSizeMobile};
  }
`;

const Settings = () => {
  const lottieRef = useRef(null);
  const [show, setShow] = useState(false);
  const [account, setAccount] = useState(null);
  const [evmProvider, setEvmProvider] = useState(null);
  const [balance, setBalance] = useState(null);
  const [payTo, setPayTo] = useState('');
  const [payAmount, setPayAmount] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accountName, setAccountName] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const connectWallet = async (type) => {
    let provider;
    if (type === 'phantom' && window.phantom && window.phantom.ethereum) {
      provider = window.phantom.ethereum;
    } else if (type === 'metamask' && window.ethereum) {
      provider = window.ethereum;
    } else {
      alert('Кошелёк не найден!');
      return;
    }
    try {
      await provider.request({ method: 'eth_requestAccounts' });
      const accounts = await provider.request({ method: 'eth_accounts' });
      setAccount(accounts[0]);
      setEvmProvider(provider);
    } catch (err) {
      alert('Ошибка подключения: ' + err.message);
    }
  };

  const connectPhantom = async () => {
    if (window.phantom && window.phantom.ethereum) {
      const provider = window.phantom.ethereum;
      try {
        await provider.request({ method: 'eth_requestAccounts' });
        const accounts = await provider.request({ method: 'eth_accounts' });
        if (accounts && accounts[0]) {
          setAccount(accounts[0]);
          setEvmProvider(provider);

          // Получаем ENS-имя (если есть)
          const ethersProvider = new ethers.BrowserProvider(provider);
          const ensName = await ethersProvider.lookupAddress(accounts[0]);
          setAccountName(ensName ? ensName : null);
        } else {
          alert('Не удалось получить адрес аккаунта!');
        }
      } catch (err) {
        alert('Ошибка подключения: ' + err.message);
      }
    } else {
      alert('Phantom не установлен!');
    }
  };

  const contractAddress = HTT_ADDRESS.address;

  const getBalance = async () => {
    if (!evmProvider || !account) {
      alert('Кошелёк не подключён!');
      return;
    }
    setIsLoading(true);
    try {
      const provider = new ethers.BrowserProvider(evmProvider);
      const contract = new ethers.Contract(contractAddress, HTT_ABI, provider);
      if (!ethers.isAddress(account)) {
        throw new Error('Некорректный адрес аккаунта!');
      }
      const bal = await contract.balanceOf(account);
      setBalance(ethers.formatUnits(bal, 3));
    } catch (err) {
      alert('Ошибка получения баланса: ' + (err.info && err.info.method ? err.info.method + ': ' : '') + err.message);
    }
    setIsLoading(false);
  };

  const handlePay = async (e) => {
    e.preventDefault();
    if (!evmProvider || !account) return;
    setIsPaying(true);
    try {
      const provider = new ethers.BrowserProvider(evmProvider);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, HTT_ABI, signer);
      const amount = ethers.parseUnits(payAmount, 3);
      const tx = await contract.payWithFee(payTo, amount);
      await tx.wait();
      alert('Оплата прошла успешно!');
      setPayTo('');
      setPayAmount('');
    } catch (err) {
      alert('Ошибка оплаты: ' + err.message);
    }
    setIsPaying(false);
  };

  const startAnimation = () => {
    if (lottieRef.current) {
      lottieRef.current.goToAndStop(0, true);
      lottieRef.current.play();
    }
    handleShow();
  };

  if (window.phantom && window.phantom.ethereum) {
    // Phantom EVM доступен
  }

  return (
    <>
      <SettingsContainer onClick={startAnimation}>
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          style={{ width: '80%', height: '80%' }}
          loop={false}
        />
      </SettingsContainer>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Web3 настройки</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!account ? (
            <Button variant="primary" onClick={connectPhantom}>
              Подключить Phantom
            </Button>
          ) : (
            <div>
              <p>
                Подключено: <b>{accountName ? accountName : 'Без имени'}</b>
              </p>
              <div style={{ fontSize: '0.8em', color: '#888', wordBreak: 'break-all' }}>
                {account}
              </div>
              <Button variant="info" onClick={getBalance} disabled={isLoading} className="mb-2">
                {isLoading ? 'Загрузка...' : 'Показать баланс'}
              </Button>
              {balance !== null && (
                <div className="mb-2">Баланс: <b>{balance} HTT</b></div>
              )}
              <form onSubmit={handlePay} style={{ marginTop: 10 }}>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="Адрес получателя"
                    value={payTo}
                    onChange={e => setPayTo(e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Сумма (HTT)"
                    value={payAmount}
                    onChange={e => setPayAmount(e.target.value)}
                    min="0.001"
                    step="0.001"
                    required
                  />
                </div>
                <Button variant="success" type="submit" disabled={isPaying}>
                  {isPaying ? 'Оплата...' : 'Оплатить'}
                </Button>
              </form>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Settings;
