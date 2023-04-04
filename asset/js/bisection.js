let subnotasi = [];
let array = [];
function notasi(v,vs,n,num,t){
  return{
    v,
    vs,
    n,
    num,
    t
  }
}
function notasii(c,x1,x2,xt,fx1,fx2,fxt,cek){
  return{
    c,
    x1,
    x2,
    xt,
    fx1,
    fx2,
    fxt,
    cek
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

function bisecting(x1, x2, xt, e, c){
	let f_xt = f(xt).toFixed(6), f_x1 = f(x1).toFixed(6), f_x2 = f(x2).toFixed(6);
  let cek = (f(xt.toFixed(6))*f(x1.toFixed(6))<0) ? '-':'+';
  // console.log(`${c}. x1 = ${x1.toFixed(6)} | x2 = ${x2.toFixed(6)} | xt = ${xt.toFixed(6)} | f(x1) = ${f_x1} | f(x2) = ${f_x2} | f(xt) = ${f_xt} | ${cek}`);
  const object = notasii(c,x1.toFixed(6),x2.toFixed(6),xt.toFixed(6),f_x1,f_x2,f_xt,cek);
  array.push(object);
	if (f_xt > 0 && f_xt <= e){
		return xt;
	}else if (Math.abs(f_xt) > 0 && Math.abs(f_xt) <= e){
		console.log("Nilai Absolut f(" << xt <<") = " << Math.abs(f_xt) << " (lebih kecil dari 0.0001), Maka dengan ini solusi sudah mencapai titik optimal\n");
		return xt;
	}else if (f_xt == 0){
		console.log("Nilai f(" << xt <<") = " << f_xt << ", Maka Solusi dicapai dengan hasil yang analitik. Bila ingin hasil yang numerik, Bisa dicoba lagi dengan nilai awalan x1 dan x2 yang lain\n");
		return xt;
	}else{
		if (f(x1)*f_xt < 0){
			return bisecting(x1, xt, (xt+x1)/2.0, e, c+1);
		}else if (f(x1)*f_xt > 0){
			return bisecting(xt, x2, (xt+x2)/2.0, e, c+1);
		}
	}
}

const makeTodo = (data)=> {
  const {c,x1,x2,xt,fx1,fx2,fxt,cek} = data;
  const container = document.createElement('tr');
  container.setAttribute('class','container');
  container.innerHTML = `
                <td class="border border-slate-600" >${c}</td>
                <td class="border border-slate-600 px-2" >${x1}</td>
                <td class="border border-slate-600 px-2" >${x2}</td>
                <td class="border border-slate-600 px-2" >${xt}</td>
                <td class="border border-slate-600 px-2" >${fx1}</td>
                <td class="border border-slate-600 px-2" >${fx2}</td>
                <td class="border border-slate-600 px-2" >${fxt}</td>
                <td class="border border-slate-600" >${cek}</td>`;
  return container;
}

const getSubmit = document.getElementById('submit');
getSubmit.addEventListener('click',(f)=> {
  f.preventDefault();
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
  console.log("Solusi xt = " + bisecting(x1, x2, (x1+x2)/2, e, 1));
  for(index of array){
    const element = makeTodo(index);
    getTable.append(element);
  }
})

