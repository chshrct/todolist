// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).

export function sum(...nums: Array<number>): number {
  // console.log(nums)
  //...здесь пишем код.
  // В return стоит "заглушка", чтоб typescript не ругался
  return nums.reduce((acc, el) => acc + el);
}

// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number, b: number, c: number): string {
  //...здесь пишем код.
  // В return стоит "заглушка", чтоб typescript не ругался
  const sortedArr = [a, b, c].sort((a, b) => a - b);

  if (a <= 0 || b <= 0 || c <= 0 || sortedArr[0] + sortedArr[1] <= sortedArr[2])
    return "00";
  if (a === b && b === c) return "10";
  if (a === b || b === c || c===a) return "01";
  return "11";
}

// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number {
  //...здесь пишем код.
  // В return стоит "заглушка", чтоб typescript не ругался
  return number
    .toString()
    .split("")
    .reduce((acc, num) => acc + +num, 0);
}

// 4. Функция isEvenIndexSumGreater принимает  параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
  //...здесь пишем код.
  // В return стоит "заглушка", чтоб typescript не ругался
  let firstSum=0
  let secondSum=0
  arr.forEach(
      (el,i)=>(i%2>0)?firstSum+=el:secondSum+=el
  )
  return secondSum>firstSum;
};

// 5. Функция getSquarePositiveIntegers принимает параметром массив чисел и возвращает новый массив.
// Новый массив состоит из квадратов целых положительных чисел, котрые являются элементами исходгого массива.
// Исходный массив не мутирует.

export function getSquarePositiveIntegers(array: Array<any>): Array<any> {
  //...здесь пишем код.
  // В return стоит "заглушка", чтоб typescript не ругался
  
  return array.reduce(
    (arr,num)=>(num>0 && num%1===0)?[...arr,num*num]:[...arr]
    ,[]
)
}

// 6. Функция принимает параметром целое не отрицательное число N и возвращает сумму всех чисел от 0 до N включительно
// Попробуйте реализовать функцию без использования перебирающих методов.

export function sumFirstNumbers(N: number): number {
  //...здесь пишем код.
  // В return стоит "заглушка", чтоб typescript не ругался
    return (N===0)?0:N+sumFirstNumbers(N-1)

}

// ...и "лапку" вверх!!!!

// Д.З.:
// 7. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено

export function getBanknoteList(amountOfMoney:number):Array<number> {
  //...здесь пишем код.
  // В return стоит "заглушка", чтоб typescript не ругался
const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1]
const  result = []
while(amountOfMoney>0){
    for (let i = 0; i < banknotes.length; i++) {
        if(amountOfMoney/banknotes[i]>=1){
            amountOfMoney-=banknotes[i]
            result.push(banknotes[i])
            break
        }
    }
}


  return result
}
