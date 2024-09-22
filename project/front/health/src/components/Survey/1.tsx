import GeneralButton from '../Button/GeneralButton';
import SelectButton from '../Button/SelectButton';
import Input from '../Input/Input';
import { useState } from 'react';
import styles from './1.module.scss'; // CSS 모듈 import
import { nicknameCheck } from '@/api/survey';
import { set } from 'react-hook-form';
export default function One({ handleNext }: { handleNext: () => void }) {
  const [nickname, setNickname] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [isNicknameError, setIsNicknameError] = useState(false); // 올바른 닉네임 여부
  // 초기상태 1, 닉네임이 중복된 상태 2. 닉네임이 사용 가능한 상태 3
  const [isNicknameChecked, setIsNicknameChecked] = useState(1);

  const handleNincknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsNicknameError(false);
  };
  const handleNincknameCheck = async () => {
    if (!nickname) {
      setIsNicknameError(true);
      setIsNicknameChecked(1);
    } else {
      try {
        const response = await nicknameCheck(nickname);

        if (response.status === 200) {
          setIsNicknameChecked(3); // 닉네임 중복 아님
        }
      } catch (e: any) {
        if (e.response && e.response.status === 409) {
          setIsNicknameChecked(2);
        } else {
          console.error('닉네임 중복 체크 중 에러 발생:', e);
        }
      }
    }
  };
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthYear(e.target.value);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthMonth(e.target.value);
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDay(e.target.value);
  };

  const handleSubmit = () => {
    const birthdate: string = `${birthYear}-${birthMonth}-${birthDay}`;
    // console.log(birthdate);
    handleNext(); // 다음 페이지로 이동
  };
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender); // 성별 선택
  };

  return (
    <div className={styles.container}>
      <h1>기본 정보</h1>
      <h3>닉네임</h3>
      <div className={styles['input-wrapper']}>
        <Input placeholder="" size="large" onChange={handleNincknameChange} value={nickname} />
        <GeneralButton buttonStyle={{ style: 'check', size: 'small' }} onClick={handleNincknameCheck}>
          중복 확인
        </GeneralButton>
      </div>
      {isNicknameError && <p className={styles['error-text']}>닉네임을 올바르게 입력해주세요</p>}
      {isNicknameChecked === 2 && <p className={styles['error-text']}>중복된 닉네임입니다.</p>}
      {isNicknameChecked === 3 && <p className={styles['success-text']}>사용 가능한 닉네임입니다.</p>}

      <h3>생년월일</h3>
      <div className={styles['input-wrapper']}>
        <Input placeholder="YYYY" size="tiny" onChange={handleYearChange} value={birthYear} />
        <Input placeholder="MM" size="tiny" onChange={handleMonthChange} value={birthMonth} />
        <Input placeholder="DD" size="tiny" onChange={handleDayChange} value={birthDay} />
      </div>
      <h3>성별</h3>
      <div className={styles['input-gender']}>
        <SelectButton label="남성" selected={selectedGender === '남성'} onClick={() => handleGenderSelect('남성')} />
        <SelectButton label="여성" selected={selectedGender === '여성'} onClick={() => handleGenderSelect('여성')} />
      </div>
      <GeneralButton
        buttonStyle={{ style: 'semiPrimary', size: 'tiny' }}
        onClick={handleSubmit}
        className={styles.nextBtn}>
        다음
      </GeneralButton>
    </div>
  );
}
