const $ = id => document.getElementById(id);
const normalize = value => String(value ?? '').normalize('NFKC').toLowerCase().trim();
const categories = ['全部','常用工具','开发工具','影音娱乐','ACG收藏'];
let selectedCategory = '全部';
const categoryOf = site => site.category || (site.name === 'Github' ? '开发工具' : site.name === 'BiliBili' ? '影音娱乐' : 'ACG收藏');
function matchesWebsite(site, query) {
  return [site.name, site.url, ...(site.keyword || [])].some(value => normalize(value).includes(normalize(query)));
}
function fileType(name) {
  const extension = name.split('.').pop().toLowerCase();
  if(['pdf','doc','docx','txt','md','xls','xlsx','ppt','pptx','csv'].includes(extension)) return 'document';
  if(['jpg','jpeg','png','gif','webp','svg','bmp'].includes(extension)) return 'image';
  if(['zip','rar','7z','tar','gz'].includes(extension)) return 'archive';
  return 'other';
}
function element(tag, className, text) { const node = document.createElement(tag); node.className = className; if(text !== undefined) node.textContent = text; return node; }
function empty(target, title, subtitle) { const box = element('div','empty'); box.append(element('strong','',title),element('span','',subtitle)); target.append(box); }
function safeUrl(value) { try { const url = new URL(value, location.href); return ['http:','https:','file:'].includes(url.protocol) ? url.href : ''; } catch { return ''; } }
function renderWeb() {
  const query = $('web-search').value;
  const items = websites.filter(site => (selectedCategory === '全部' || categoryOf(site) === selectedCategory) && matchesWebsite(site, query));
  $('web-grid').replaceChildren(); $('web-total').textContent = `${websites.length} 个收藏`;
  $('web-status').textContent = `显示 ${items.length} / ${websites.length} 个网站`;
  for(const site of items) {
    const card = element('a','card'); card.href = safeUrl(site.url); card.target = '_blank'; card.rel = 'noopener noreferrer';
    const top = element('div','card-top'); top.append(element('span','icon',site.icon), element('span','tag',categoryOf(site)));
    const domain = element('div','domain'); domain.append(element('span','',new URL(site.url).hostname),element('span','','↗'));
    card.append(top,element('h3','',site.name),element('p','',site.description),domain); $('web-grid').append(card);
  }
  if(!items.length) empty($('web-grid'),'暂时没有匹配的网站','试试更短的关键词，或切换到全部分类。');
}
function sizeLabel(size) { if(!Number.isFinite(size)) return '大小未填写'; if(size < 1024) return `${size} B`; if(size < 1048576) return `${(size / 1024).toFixed(1)} KB`; return `${(size / 1048576).toFixed(1)} MB`; }
function renderFiles() {
  const all = downloads;
  const query = normalize($('file-search').value), type = $('file-type').value;
  const items = all.filter(file => normalize(file.name).includes(query) && (type === 'all' || fileType(file.name) === type));
  $('file-list').replaceChildren(); $('file-total').textContent = `${all.length} 个文件`;
  $('file-status').textContent = `显示 ${items.length} / ${all.length} 个文件`;
  for(const file of items) {
    const row = element('div','file-row'); const info = element('div','file-info');
    info.append(element('strong','',file.name),element('small','',`${sizeLabel(file.size)} · ${file.folder || '下载资源'}`));
    const href = safeUrl(file.url); const link = element(href ? 'a' : 'span','download',href ? '下载 ↓' : '链接未配置');
    if(href) { link.href = href; link.download = file.name; link.rel = 'noopener noreferrer'; }
    row.append(element('span','icon',fileType(file.name) === 'image' ? '▧' : '▤'), info, link); $('file-list').append(row);
  }
  if(!items.length) empty($('file-list'),all.length ? '没有找到这个文件' : '文件收藏正在整理中',all.length ? '试试文件名的其他部分，或选择全部类型。' : '之后会在这里分享文件，欢迎再来看看。');
}
for(const category of categories) {
  const button = element('button', category === selectedCategory ? 'active' : '', category); button.type = 'button'; button.setAttribute('aria-pressed',String(category === selectedCategory));
  button.addEventListener('click',()=>{ selectedCategory = category; for(const item of $('categories').children) { item.classList.toggle('active',item === button); item.setAttribute('aria-pressed',String(item === button)); } renderWeb(); }); $('categories').append(button);
}
$('web-search').addEventListener('input',renderWeb);
$('file-search').addEventListener('input',renderFiles);
$('file-type').addEventListener('change',renderFiles);
renderWeb(); renderFiles();
