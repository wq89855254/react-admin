function ajax() {
  return new Promise((res,rej)=>{
    let a = 2
    if(a>1){
      resolve(a)
    }
  })
}

console.log(ajax)