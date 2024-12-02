import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// 컴포넌트로 관리
function Counter({ n = 2 }) {
  const [count, setCount] = useState(0);

  // 다른곳에서 count를 사용할때 문제가 생길수도 있으므로 
  // 현재의 값에 의존해서 변경하도록 코드 수정
  function decrement(){
    setCount((current) => {
      if (current <= 0){
        return;
      }

      return current - 1;
    });
  }

  function increment() {
    setCount((current) => current + 1);
  }

  return (
    // 가장 최상위에 있는 요소는 하나만 있어야함.
    // 아니면 태그로 감싸줘야한다.
    <>
      <h1>nomal: {count}</h1>
      <h1>double: {count * 2}</h1>
      <h1>{n} 배수: {count * n} </h1>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </>
  )
}

function App() {
  const [list, setList] = useState([
    {id: "134215", text: "밥먹기"}
  ]);
  // const [value, setValue] = useState('');

  // 렌더링이 언제 일어나는지 알려면, 콘솔창 활용
  // 값을 수정할때 마다 렌더링 하는데 이거 안좋은거거든요.
  // => useState로 값을 관리하는것보다. ref 쓰는게 좋음 -> 객체를 만들어준다.
  const ref = useRef();

  // 성능 향상 가능
  // console.log(ref, ref.current, ref.current.value);
  // console.log('렌더링');

  return (
    <>
      <h1>Todo</h1>
      <input ref={ref}/>

      {/* 동시에 여러번 이벤트가 발생될 수 있으므로, 콜백 이벤트로 작성하는게 좋음. 
        리스트에 추가 된 다음에 참고하는게 아니라, 이전 리스트 참고한 후 추가하는거라서.
        그래서 동시에 누르면 하나가 추가 안될수도있다.*/}
      <button onClick={()=>{
        const id = new Date().toISOString();
        const text = ref.current.value;

        setList((current) => {
          ref.current.value = '';
          return [...current, {id, text}];
        });
        // setValue('');
      }}>추가</button>
      {list.map((item)=>{
        return <p key={item.id}>{item.text}</p>;
        // 같은 키끼리 비교해서 순서가 바뀌었을때, 해당 아이템이 같은 아이템인지 확인하기 위해 사용한다.
        // 배열 내 인덱스가 바뀌었을 때 재 랜더링 방지하고 이전꺼를 사용하기 위해.. 사용
        // 이전에 해당 키에 사용하는 아이템이냐. 판단하기 위해 사용. >> 모르겠다 알아봐야할듯 ㅠㅠ
        // 키는 인덱스가 변해도 변하지 않음. -> 그래서 보통 고유값을 사용한다. (유저 id 같은거)
        // 중복되지 않으면서 유니크한 값, 순서 상관없는 고유한 값 사용하기.
      })}
    </>
  )

  // const [value, setValue] = useState(4);

  // return (
  //   <>
  //     <input value={value} onChange={(event) => {
  //       setValue(Number(event.target.value));
  //     }}/>
  //     <Counter/>
  //     <Counter n={value}/>
  //   </>
  // )
}

export default App
