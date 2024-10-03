async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      console.log('서비스 워커 등록 시도 중...');
      const firebaseRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log('Firebase Service Worker 등록 성공:', firebaseRegistration.scope);

      console.log('ServiceWorker registration successful with scope: ', firebaseRegistration.scope);
      console.log('서비스 워커 활성화');

      // FCM 토큰이 세션에 없는 경우에만 알림 권한 요청 및 토큰 발급
      // if (!sessionStorage.getItem('fcmToken')) {
      //   const permission = await Notification.requestPermission();
      //   if (permission === 'granted') {
      //     console.log('알림 권한 허용됨');
      //     const currentToken = await getToken(messaging, {
      //       vapidKey:
      //         'BHwpLNL8I7G3uVXMnYxMZWiopgbTh5k0bC-HRQPEVXj6mz7cPrjcNpgEhwDf08bq99wJF7CQA3DRa16ZbBHwpLNL8I7G3uVXMnYxMZWiopgbTh5k0bC-HRQPEVXj6mz7cPrjcNpgEhwDf08bq99wJF7CQA3DRa16Zb',
      //       // serviceWorkerRegistration: firebaseRegistration,
      //     });
      //     if (currentToken) {
      //       sessionStorage.setItem('fcmToken', currentToken);
      //       console.log('FCM 토큰 발급 성공:', currentToken);
      //     } else {
      //       console.warn('FCM 토큰을 가져올 수 없습니다.');
      //     }
      //   } else {
      //     console.log('알림 권한이 거부되었습니다.');
      //   }
      // } else {
      //   console.log('기존 FCM 토큰이 세션에 저장되어 있습니다.');
      // }
    } catch (error) {
      console.error('Service Worker 등록 실패:', error);
    }
  } else {
    console.warn('Service Worker not supported in this browser');
  }
}

// 서비스 워커 등록 함수 호출
registerServiceWorker();
