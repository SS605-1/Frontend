const WageCalculate = () => {
  return (
    <div className="flex flex-col text-black font-normal text-xl gap-y-24 w-[295px] h-[515px]">
      <div>
        <div>
          <p>1. 1주 근로시간이 15시간 미만 실제 근로시간 * 시급</p>
        </div>
        <div>
          <p>
            2. 1주 근로시간이 15시간 이상 주급 = (1주 근로시간 + 주휴수당) *
            시급 월급 = (1주 근로시간 + 주휴수당) * 시급 * 52주 /12개월
          </p>
        </div>
        <div>
          <p>3. 저녁 10시부터 새벽 6시까지 야간 수당(시급의 1.5배 적용)</p>
        </div>
      </div>
      <li>
        홈 화면에 보이는 월급은 현재 근로시간을 기준으로 산정된 금액입니다.
      </li>
    </div>
  );
};

export default WageCalculate;
