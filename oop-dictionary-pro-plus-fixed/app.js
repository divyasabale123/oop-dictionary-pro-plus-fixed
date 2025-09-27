// Fixed OOP Dictionary Pro++
const STORAGE_KEY='oop_dict_pro_plus_fixed';
const initial=[
 {word:'Encapsulation',phonetic:'/ɛnˌkæpsjʊˈleɪʃən/',meaning:'Bundling data and methods.',example:'Class hides fields.',tags:['oop']},
 {word:'Inheritance',phonetic:'/ɪnˈhɛrɪt(ə)ns/',meaning:'Subclass extends superclass.',example:'Dog extends Animal.',tags:['oop']}
];
let words=[];
const cardsEl=document.getElementById('cards');
const searchEl=document.getElementById('search');
const favoritesEl=document.getElementById('favorites');
const modal=document.getElementById('modal');
const addBtn=document.getElementById('addBtn');
const modalTitle=document.getElementById('modalTitle');
const wordInput=document.getElementById('wordInput');
const phoneticInput=document.getElementById('phoneticInput');
const meaningInput=document.getElementById('meaningInput');
const exampleInput=document.getElementById('exampleInput');
const tagsInput=document.getElementById('tagsInput');
const saveBtn=document.getElementById('saveBtn');
const cancelBtn=document.getElementById('cancelBtn');
let editIndex=-1;
function load(){const raw=localStorage.getItem(STORAGE_KEY);if(raw){try{words=JSON.parse(raw);}catch(e){words=initial.slice();}}else{words=initial.slice();save();}}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(words));}
function render(){const q=(searchEl.value||'').toLowerCase();cardsEl.innerHTML='';words.filter(w=>!q||w.word.toLowerCase().includes(q)||w.meaning.toLowerCase().includes(q)).forEach((w,i)=>{const d=document.createElement('div');d.className='card';d.innerHTML=`<h3>${w.word}</h3><div>${w.phonetic||''}</div><p>${w.meaning}</p><div>${w.example||''}</div>`;cardsEl.appendChild(d);});}
function openModal(title,idx=-1){editIndex=idx;modal.style.display='flex';modalTitle.textContent=title;if(idx>-1){const w=words[idx];wordInput.value=w.word;phoneticInput.value=w.phonetic||'';meaningInput.value=w.meaning||'';exampleInput.value=w.example||'';tagsInput.value=(w.tags||[]).join(',');}else{wordInput.value='';phoneticInput.value='';meaningInput.value='';exampleInput.value='';tagsInput.value='';}}
function closeModal(){modal.style.display='none';editIndex=-1;}
saveBtn.addEventListener('click',()=>{const w=wordInput.value.trim();if(!w){alert('Word required');return;}const item={word:w,phonetic:phoneticInput.value.trim(),meaning:meaningInput.value.trim(),example:exampleInput.value.trim(),tags:tagsInput.value.split(',').map(x=>x.trim()).filter(Boolean)};if(editIndex>-1){words[editIndex]=item;}else{words.unshift(item);}save();render();closeModal();});
cancelBtn.addEventListener('click',closeModal);
searchEl.addEventListener('input',render);
addBtn.addEventListener('click',()=>openModal('Add Word'));
load();render();