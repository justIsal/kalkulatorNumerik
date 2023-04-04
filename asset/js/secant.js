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
function notasii(c,x1,x2,x3,fx1,fx2,fx3){
  return{
    c,
    x1,
    x2,
    x3,
    fx1,
    fx2,
    fx3
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

function secant(x1, x2, e, c){
	let f_x1 = f(x1).toFixed(6), f_x2 = f(x2).toFixed(6);
	let x3 = x2-(f_x2*((x2-x1)/(f_x2-f_x1)));
	let f_x3 = f(x3).toFixed(6);
	// cout << c << ". x1 = " << x1 << " | x2 = " << x2 << " | x3 = " << x3 << " | f(x1) = " << f_x1 << " | f(x2) = " << f_x2  << " | f(x3) = " << f_x3 << endl;
    console.log(`${c}. x1 = ${x1.toFixed(6)} x2 = ${x2.toFixed(6)} x3 = ${x3.toFixed(6)} fx1 = ${f_x1} fx2 = ${f_x2} fx3 = ${f_x3}`);
    const object = notasii(c,x1.toFixed(6),x2.toFixed(6),x3.toFixed(6),f_x1,f_x2,f_x3);
    array.push(object);
	if (0 <= f_x3 && f_x3 <= e){
		if (f_x3 == 0){
			console.log("Solusi Ditemukan, Namun ini adalah solusi analitik karena f(x3) = 0 \n");
			return x3;
		}else{
			console.log("Solusi Numerik Ditemukan!\n");
			return x3;
		}
	}else if(0 <= Math.abs(f_x3) && Math.abs(f_x3) <= e){
		console.log("Solusi Mutlak Numerik Ditemukan!\n");
		return x3;
	}else{
		return secant(x2, x3, e, c+1);
	}
}

const makeTodo = (data)=> {
  const {c,x1,x2,x3,fx1,fx2,fx3} = data;
  const container = document.createElement('tr');
  container.setAttribute('class','container');
  container.innerHTML = `
                      <td class="border border-slate-600" >${c}</td>
                      <td class="border border-slate-600 px-2" >${x1}</td>
                      <td class="border border-slate-600 px-2" >${x2}</td>
                      <td class="border border-slate-600 px-2" >${x3}</td>
                      <td class="border border-slate-600 px-2" >${fx1}</td>
                      <td class="border border-slate-600 px-2" >${fx2}</td>
                      <td class="border border-slate-600 px-2" >${fx3}</td>`;
  return container;
}

const getSubmit = document.getElementById('submit');
getSubmit.addEventListener('click',(p)=> {
  p.preventDefault();
  const getEps = document.getElementById('e'),
      getFunc = document.getElementById('function'),
      getX1 = document.getElementById('x1'),
      getX2 = document.getElementById('x2'),
      getTable = document.getElementById('tbody');
  let e = parseFloat(getEps.value);
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
  let x2 = Number(getX2.value);
  console.log(e)
  secant(x1, x2, e, 1);
  for(index of array){
    const element = makeTodo(index);
    getTable.append(element);
  }
})

