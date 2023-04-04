let subnotasi = [];
let array = []
function notasi(v,vs,n,num,t){
  return{
    v,
    vs,
    n,
    num,
    t
  }
}
function object(c,x1,fx1,inv,x2,fx2){
  return{
    c,
    x1,
    fx1,
    inv,
    x2,
    fx2
  }
}
function f(x) {
  let hasil = 0;
  for (let i of subnotasi) {
    // console.log(`subnotasi { ${i.v} ${i.vs} ${i.n} ${i.num} ${i.t} }`)
    if (i.t == "p") {
      if (i.v && i.n) {
        hasil += i.num * Math.pow(x, i.vs);
      } else {
        if (i.v) {
          hasil += Math.pow(x, i.vs);
        } else {
          hasil += i.num;
        }
      }
    } else {
      if (i.v && i.n) {
        hasil -= i.num * Math.pow(x, i.vs);
      } else {
        if (i.v) {
          hasil -= Math.pow(x, i.vs);
        } else {
          hasil -= i.num;
        }
      }
    }
  }
  return hasil;
}

function f_inv(x) {
  let hasil = 0;
  for (let i of subnotasi) {
    if (i.t === "p") {
      if (i.v && i.n) {
        if (i.vs > 1) {
          hasil += i.vs * i.num * Math.pow(x, i.vs - 1);
        } else {
          hasil += i.num;
        }
      } else {
        if (i.v) {
          if (i.vs > 1) {
            hasil += i.vs * Math.pow(x, i.vs - 1);
          } else {
            hasil += 1;
          }
        } else {
          continue;
        }
      }
    } else {
      if (i.v && i.n) {
        if (i.vs > 1) {
          hasil -= i.vs * i.num * Math.pow(x, i.vs - 1);
        } else {
          hasil -= i.num;
        }
      } else {
        if (i.v) {
          if (i.vs > 1) {
            hasil -= i.vs * Math.pow(x, i.vs - 1);
          } else {
            hasil -= 1;
          }
        } else {
          continue;
        }
      }
    }
  }
  return hasil;
}


function newton(x_cur, e, c) {
  let f_x = f(x_cur),finv_x = f_inv(x_cur);
  let x2 = x_cur - f_x / finv_x;
  let f_x2 = f(x2);
  // if (c == )
  console.log(c + ". x1 = " + x_cur.toFixed(6) + " | f(x1) = " + f_x.toFixed(6) + " | f.inv(x1) = " + finv_x.toFixed(6) + " | x2 = " + x2.toFixed(6) + " | f(x2) = " + f_x2.toFixed(6));
  const getObject = object(c,x_cur.toFixed(6),f_x.toFixed(6),finv_x.toFixed(6),x2.toFixed(6),f_x2.toFixed(6));
  array.push(getObject);
  if (f_x2 >= 0 && f_x2 <= e) {
    if (f_x2 == 0) {
      console.log( "Solusi ditemukan namun dalam keadaan f(" + x2 + ") = " + f_x2 + ", Maka Ini adala Solusi yang bersifat analitik. Apabila ingin menemukan solusi yang numerik maka boleh diulangi lagi program ini" );
    } else {
      console.log("Solusi Numerik Ditemukan!");
    }
    return x2;
  } else if (Math.abs(f_x2) >= 0 && Math.abs(f_x2) <= e){
    
  }else{
    return newton(x2, e, c + 1);
  }
}



const makeTodo = (data)=> {
  const {c,x1,fx1,inv,x2,fx2} = data;
  const container = document.createElement('tr');
  container.setAttribute('class','container');
  container.innerHTML = `
                      <td class="border border-slate-600" >${c}</td>
                      <td class="border border-slate-600 px-2" >${x1}</td>
                      <td class="border border-slate-600 px-2" >${fx1}</td>
                      <td class="border border-slate-600 px-2" >${inv}</td>
                      <td class="border border-slate-600 px-2" >${x2}</td>
                      <td class="border border-slate-600 px-2" >${fx2}</td>`;
  return container;
}

const getSubmit = document.getElementById('submit');
getSubmit.addEventListener('click',(f)=> {
  f.preventDefault();
  const getEps = document.getElementById('e'),
      getFunc = document.getElementById('function'),
      getX1 = document.getElementById('x1'),
      getTable = document.getElementById('tbody');
  let e = parseFloat(getEps.value);
  // console.log(e);
  let ekuasi = getFunc.value;
  let len = ekuasi.length;
  let traverse = new Array(len).fill(false);
  let matemp = notasi(0,1,0,0,'p');

  for (let i = 0; i <= len; i++) {
    if (i == len) {
      subnotasi.push(matemp);
      break;
    }
    if (!traverse[i]) {
      traverse[i] = 1;
      if (!(/[0-9xX\^+\-]/).test(ekuasi[i])) {
        alert("Anda memasukan notasi dengan karakter tidak sesuai notasi, Ingat untuk memasukan notasi rumus ekuasi secara matematis hanya dengan : \n" +
          "Angka 0 sampai 9\n" +
          "X atau x\n" +
          "^ (simbol untuk pangkat)\n" +
          "+ atau -\n");
        // subnotasi = [];
        alert("Silahkan klik tombol OK untuk mengulangi lagi pemasukan ulang rumus notasi ekuasi");
        loadData();
      }
      if (/[0-9]/.test(ekuasi[i])) {
        matemp.n = 1;
        let temp = ekuasi[i].toString();
        let c = 1;
        while (/[0-9]/.test(ekuasi[i+c]) && i+c < len) {
          traverse[i+c] = true;
          temp += ekuasi[i+c];
          c++;
        }
        matemp.num = parseInt(temp);
      } else if (ekuasi[i] == 'x' || ekuasi[i] == 'X') {
        matemp.v = 1;
        let c = 1;
        if (ekuasi[i+c] == '^') {
          traverse[i+c] = true;
          let temp = 0;
          c++;
          while (/[0-9]/.test(ekuasi[i+c]) && i+c < len) {
            traverse[i+c] = true;
            temp += ekuasi[i+c];
            c++;
          }
          matemp.vs = parseInt(temp);
        }
      } else if (ekuasi[i] == '+' || ekuasi[i] == '-') {
        subnotasi.push(matemp);
        if (ekuasi[i] == '+') {
          matemp = notasi(0,1,0,0,'p');
        } else {
          matemp = notasi(0,1,0,0,'m');
        }
      }
    }
  }
  let x1 = Number(getX1.value);
  // let x2 = Number(getX2.value);
  // console.log(e);
  console.log("Solusi xt = " + newton(x1, e, 1));
  for(index of array){
    const element = makeTodo(index);
    getTable.append(element);
  }
})