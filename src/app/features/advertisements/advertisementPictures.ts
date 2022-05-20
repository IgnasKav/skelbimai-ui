const imageArray: string[] = [
  'https://images.unsplash.com/photo-1586699253884-e199770f63b9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
]

const getRandomInt = () => {
  return Math.floor(Math.random() * imageArray.length)
}

const getRandomImage = () => imageArray[getRandomInt()]

export default getRandomImage
