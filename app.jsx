const { useState, useEffect, useRef, useMemo } = React;

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const PRODUCTS = [
  { id:'p1', name:'Ranchero Denim Jacket', year:1968, price:168, sale:null,
    category:'Outerwear', colors:['indigo','ecru'], sizes:['S','M','L','XL'],
    img:'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=1200&q=80',
    tag:'BESTSELLER' },
  { id:'p2', name:'Workshop Canvas Chore Coat', year:1954, price:224, sale:null,
    category:'Outerwear', colors:['olive','camel'], sizes:['S','M','L','XL'],
    img:'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80' },
  { id:'p3', name:"Drifter Flannel Shirt", year:1972, price:98, sale:78,
    category:'Shirts', colors:['rust','olive','indigo'], sizes:['XS','S','M','L','XL'],
    img:'https://images.unsplash.com/photo-1588099768523-f4e6a5679d88?w=1200&q=80',
    tag:'SALE' },
  { id:'p4', name:'Highway Selvedge Jean', year:1965, price:188, sale:null,
    category:'Pants', colors:['indigo','black'], sizes:['28','30','32','34','36'],
    img:'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=80' },
  { id:'p5', name:'Route 66 Graphic Tee', year:1971, price:48, sale:36,
    category:'Shirts', colors:['cream','olive'], sizes:['S','M','L','XL'],
    img:'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1200&q=80',
    tag:'SALE' },
  { id:'p6', name:'Miner Heavyweight Hoodie', year:1974, price:134, sale:null,
    category:'Shirts', colors:['camel','olive','black'], sizes:['S','M','L','XL'],
    img:'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&q=80' },
  { id:'p7', name:'Union Workwear Trouser', year:1958, price:154, sale:null,
    category:'Pants', colors:['olive','camel'], sizes:['28','30','32','34','36'],
    img:'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=1200&q=80' },
  { id:'p8', name:'Prairie Leather Boot', year:1962, price:298, sale:null,
    category:'Footwear', colors:['camel','brown'], sizes:['8','9','10','11','12'],
    img:'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80',
    tag:'NEW' },
  { id:'p9', name:'Pioneer Wool Beanie', year:1969, price:42, sale:null,
    category:'Accessories', colors:['olive','cream','rust'], sizes:['One Size'],
    img:'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=1200&q=80' },
];

const COLOR_MAP = {
  indigo:'#2F3B56', ecru:'#E6DCC4', olive:'#6B6B3A', camel:'#B8895A',
  rust:'#A64A2E', cream:'#F0E6D2', black:'#1F1B16', brown:'#5C3B20'
};

const CATEGORIES = ['All','Outerwear','Shirts','Pants','Footwear','Accessories'];

const INSTAGRAM = [
  'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&q=80',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80',
  'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600&q=80',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
  'https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=600&q=80',
];

/* -------------------------------------------------------------------------- */
/*  Icons (simple)                                                            */
/* -------------------------------------------------------------------------- */

const Icon = {
  heart: (f)=>(<svg width="18" height="18" viewBox="0 0 24 24" fill={f?'currentColor':'none'} stroke="currentColor" strokeWidth="1.8"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/></svg>),
  bag: ()=>(<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>),
  search: ()=>(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>),
  close: ()=>(<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6 6 18"/></svg>),
  arrow: ()=>(<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>),
  plus: ()=>(<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>),
  minus: ()=>(<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/></svg>),
  star: ()=>(<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7 7 .8-5.3 4.7L18 22l-6-3.5L6 22l1.3-7.5L2 9.8 9 9z"/></svg>),
};

/* -------------------------------------------------------------------------- */
/*  Stamp (decorative)                                                        */
/* -------------------------------------------------------------------------- */

function CircleStamp({ top='since 1952', bottom='heritage co.', middle='EST', size=120 }){
  const id = useMemo(()=>'c'+Math.random().toString(36).slice(2,7),[]);
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className="stamp">
      <defs>
        <path id={id} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
      </defs>
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1"/>
      <circle cx="60" cy="60" r="48" fill="none" stroke="currentColor" strokeWidth="1"/>
      <text fontSize="9" fontFamily="Archivo" fontWeight="700" letterSpacing="2" fill="currentColor">
        <textPath href={`#${id}`} startOffset="0">• {top.toUpperCase()} •  {bottom.toUpperCase()}  </textPath>
      </text>
      <text x="60" y="58" textAnchor="middle" fontFamily="DM Serif Display" fontSize="14" fill="currentColor" fontStyle="italic">{middle}</text>
      <text x="60" y="74" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" letterSpacing="1" fill="currentColor">U · S · A</text>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Announcement bar                                                          */
/* -------------------------------------------------------------------------- */

function Announce(){
  const msgs = [
    'FREE SHIPPING ON U.S. ORDERS OVER $120',
    'SUMMER CLEARANCE · UP TO 40% OFF · ENDS SUNDAY',
    'HAND-CUT IN LOS ANGELES SINCE 1952',
  ];
  const [i,setI]=useState(0);
  useEffect(()=>{ const t=setInterval(()=>setI(x=>(x+1)%msgs.length),3500); return ()=>clearInterval(t)},[]);
  return (
    <div style={{background:'var(--ink)',color:'var(--cream)',padding:'10px 20px',display:'flex',justifyContent:'center',alignItems:'center',gap:16,fontFamily:'JetBrains Mono',fontSize:11,letterSpacing:'.15em',textTransform:'uppercase',position:'relative',zIndex:20}}>
      <span style={{opacity:.5}}>◀</span>
      <span key={i} style={{animation:'fade .5s ease'}}>{msgs[i]}</span>
      <span style={{opacity:.5}}>▶</span>
      <style>{`@keyframes fade{from{opacity:0;transform:translateY(4px)}to{opacity:1}}`}</style>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Header                                                                    */
/* -------------------------------------------------------------------------- */

function Header({ cartCount, wishCount, onCart, onWish, onShop }){
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>40);
    window.addEventListener('scroll',h); h();
    return ()=>window.removeEventListener('scroll',h);
  },[]);
  return (
    <header style={{
      position:'sticky',top:0,zIndex:19,
      background: scrolled ? 'rgba(244,237,224,.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)':'none',
      borderBottom: scrolled ? '1px solid rgba(31,27,22,.1)':'1px solid transparent',
      transition:'all .3s ease',
      padding: scrolled ? '14px 32px' : '22px 32px',
      display:'grid',gridTemplateColumns:'1fr auto 1fr',alignItems:'center',gap:24
    }}>
      <nav style={{display:'flex',gap:28,fontFamily:'Archivo',fontSize:12,fontWeight:600,letterSpacing:'.12em',textTransform:'uppercase'}}>
        <a onClick={onShop} style={{cursor:'pointer'}}>Shop</a>
        <a>New Arrivals</a>
        <a>Journal</a>
        <a>Stores</a>
      </nav>
      <a href="#" style={{fontFamily:'DM Serif Display',fontSize: scrolled?22:28,letterSpacing:'.01em',textAlign:'center',transition:'font-size .3s',whiteSpace:'nowrap'}}>
        LivingVintage<span style={{fontStyle:'italic',fontSize:'.6em',verticalAlign:'super',color:'var(--camel)'}}>°</span>
      </a>
      <div style={{display:'flex',justifyContent:'flex-end',alignItems:'center',gap:22}}>
        <button title="Search"><Icon.search/></button>
        <button onClick={onWish} title="Wishlist" style={{position:'relative'}}>
          {Icon.heart(wishCount>0)}
          {wishCount>0 && <span style={pill}>{wishCount}</span>}
        </button>
        <button onClick={onCart} title="Cart" style={{position:'relative'}}>
          <Icon.bag/>
          {cartCount>0 && <span style={pill}>{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}
const pill = {position:'absolute',top:-6,right:-8,background:'var(--rust)',color:'var(--cream)',fontSize:9,fontWeight:700,padding:'2px 5px',borderRadius:10,minWidth:16,textAlign:'center',fontFamily:'JetBrains Mono'};

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

function Hero({ onShop }){
  return (
    <section style={{position:'relative',minHeight:'92vh',padding:'40px 32px 80px',overflow:'hidden'}}>
      {/* huge type, behind image */}
      <div style={{
        position:'absolute',top:'46%',left:'50%',transform:'translate(-50%,-50%)',
        fontFamily:'DM Serif Display',fontSize:'clamp(180px, 26vw, 420px)',
        color:'var(--camel)',opacity:.18,letterSpacing:'-.03em',lineHeight:.85,
        whiteSpace:'nowrap',fontStyle:'italic',pointerEvents:'none',zIndex:0
      }}>
        Heritage
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1.1fr',gap:40,alignItems:'center',position:'relative',zIndex:1,maxWidth:1440,margin:'0 auto'}}>
        {/* LEFT */}
        <div style={{paddingTop:40}}>
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:28}}>
            <div style={{width:48,height:1,background:'var(--ink)'}}/>
            <span className="mono">Vol. 07 · Autumn Collection '26</span>
          </div>

          <h1 style={{
            fontFamily:'DM Serif Display',fontWeight:400,
            fontSize:'clamp(56px, 7vw, 110px)',lineHeight:.92,letterSpacing:'-.02em',
            margin:'0 0 28px',color:'var(--ink)'
          }}>
            Made to<br/>
            <span style={{fontStyle:'italic',color:'var(--olive-dk)'}}>outlast</span> the<br/>
            decade.
          </h1>

          <p style={{maxWidth:420,fontSize:16,lineHeight:1.6,color:'var(--ink-2)',margin:'0 0 36px'}}>
            Rugged American garments built on the same patterns we drafted in a Pasadena basement in 1952. Raw denim, heavy canvas, real brass. No seasons — just stories.
          </p>

          <div style={{display:'flex',gap:14,alignItems:'center',marginBottom:40}}>
            <button onClick={onShop} style={primaryBtn}>Shop the collection <Icon.arrow/></button>
            <button style={ghostBtn}>Read our story</button>
          </div>

          <div style={{display:'flex',gap:48,paddingTop:28,borderTop:'1px solid rgba(31,27,22,.15)',maxWidth:520}}>
            <Stat k="73" l="years of craft"/>
            <Stat k="06" l="U.S. workshops"/>
            <Stat k="∞" l="lifetime repairs"/>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{position:'relative'}}>
          <div style={{
            aspectRatio:'4/5',borderRadius:2,overflow:'hidden',position:'relative',
            boxShadow:'0 40px 80px -20px rgba(31,27,22,.35)',
            backgroundImage:'url(https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?w=1400&q=80)',
            backgroundSize:'cover',backgroundPosition:'center',
            filter:'sepia(.15) saturate(.95) contrast(1.02)'
          }}>
            {/* film-style marks */}
            <div style={{position:'absolute',top:12,left:12,color:'var(--cream)',display:'flex',flexDirection:'column',gap:6}}>
              <span className="mono" style={{background:'rgba(31,27,22,.5)',padding:'4px 8px'}}>LV · 07 — 26</span>
              <span className="mono" style={{background:'rgba(31,27,22,.5)',padding:'4px 8px'}}>ISO 400  f/2.8</span>
            </div>
            <div style={{position:'absolute',bottom:16,right:16,color:'var(--cream)'}}>
              <span className="mono" style={{background:'rgba(31,27,22,.5)',padding:'4px 8px'}}>PHOTO 04 / 12</span>
            </div>
          </div>

          {/* floating stamp */}
          <div style={{position:'absolute',left:-40,bottom:-40,color:'var(--ink)',background:'var(--cream)',borderRadius:'50%',padding:10,transform:'rotate(-12deg)',boxShadow:'0 10px 30px rgba(0,0,0,.15)'}}>
            <CircleStamp top="livingvintage" bottom="american made" middle="LV" size={140}/>
          </div>

          {/* small tag card */}
          <div style={{position:'absolute',right:-20,top:40,background:'var(--ink)',color:'var(--cream)',padding:'16px 20px',maxWidth:200,transform:'rotate(3deg)',boxShadow:'0 20px 40px rgba(0,0,0,.2)'}}>
            <div className="mono" style={{opacity:.6,marginBottom:6}}>Featured</div>
            <div style={{fontFamily:'DM Serif Display',fontSize:20,lineHeight:1.1,marginBottom:8,fontStyle:'italic'}}>"Ranchero" denim jacket</div>
            <div className="mono">$168 · indigo selvedge</div>
          </div>
        </div>
      </div>
    </section>
  );
}
const primaryBtn = {background:'var(--ink)',color:'var(--cream)',padding:'16px 24px',fontFamily:'Archivo',fontSize:12,fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',display:'inline-flex',alignItems:'center',gap:10,borderRadius:999,transition:'all .2s'};
const ghostBtn = {background:'transparent',color:'var(--ink)',padding:'16px 18px',fontFamily:'Archivo',fontSize:12,fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',borderBottom:'1px solid var(--ink)',borderRadius:0};

function Stat({k,l}){return(
  <div>
    <div style={{fontFamily:'DM Serif Display',fontSize:38,lineHeight:1,color:'var(--ink)'}}>{k}</div>
    <div className="mono" style={{marginTop:6,color:'var(--muted)'}}>{l}</div>
  </div>
);}

/* -------------------------------------------------------------------------- */
/*  Marquee                                                                   */
/* -------------------------------------------------------------------------- */

function Marquee(){
  const words = ['RAW DENIM','HEAVY CANVAS','BRASS HARDWARE','SELVEDGE','HAND-CUT','LIFETIME REPAIRS','MADE IN USA'];
  return (
    <div style={{background:'var(--ink)',color:'var(--cream)',padding:'22px 0',overflow:'hidden',whiteSpace:'nowrap',borderTop:'1px solid var(--camel)',borderBottom:'1px solid var(--camel)'}}>
      <div style={{display:'inline-flex',gap:48,animation:'slide 30s linear infinite',fontFamily:'DM Serif Display',fontSize:36,fontStyle:'italic'}}>
        {[...Array(4)].map((_,i)=>(
          <span key={i} style={{display:'inline-flex',gap:48}}>
            {words.map((w,j)=>(<span key={j} style={{display:'inline-flex',alignItems:'center',gap:48}}>{w}<span style={{color:'var(--camel)'}}>✦</span></span>))}
          </span>
        ))}
      </div>
      <style>{`@keyframes slide{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Story                                                                     */
/* -------------------------------------------------------------------------- */

function Story(){
  return (
    <section style={{padding:'140px 32px',maxWidth:1440,margin:'0 auto'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'start'}}>
        <div style={{position:'sticky',top:120}}>
          <div className="mono" style={{marginBottom:20,color:'var(--camel-dk)'}}>— Our Story</div>
          <h2 style={{fontFamily:'DM Serif Display',fontSize:'clamp(40px, 5vw, 72px)',lineHeight:1,margin:'0 0 40px',letterSpacing:'-.02em'}}>
            Three generations of the <span style={{fontStyle:'italic',color:'var(--olive-dk)'}}>same cutting table</span>.
          </h2>
          <p style={{fontSize:17,lineHeight:1.7,color:'var(--ink-2)',maxWidth:480,marginBottom:24}}>
            In 1952, Clyde Harlan started stitching workshirts in his mother's garage in Pasadena. The pattern for the Ranchero jacket he drafted that August is still pinned to the wall of our cutting room today — yellowed at the edges, but otherwise untouched.
          </p>
          <p style={{fontSize:17,lineHeight:1.7,color:'var(--ink-2)',maxWidth:480,marginBottom:40}}>
            We still cut fabric by hand. We still rivet by hand. We still repair any garment we've ever made, for as long as you own it.
          </p>
          <div style={{display:'flex',gap:16,alignItems:'center'}}>
            <div style={{width:64,height:64,borderRadius:'50%',background:'url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80)',backgroundSize:'cover',backgroundPosition:'center',filter:'sepia(.3)'}}/>
            <div>
              <div style={{fontFamily:'DM Serif Display',fontSize:20,fontStyle:'italic'}}>Wendell Harlan</div>
              <div className="mono" style={{color:'var(--muted)'}}>Third generation · Master cutter</div>
            </div>
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          <img src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80" style={{aspectRatio:'3/4',objectFit:'cover',filter:'sepia(.2) contrast(1.05)'}}/>
          <img src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80" style={{aspectRatio:'3/4',objectFit:'cover',marginTop:48,filter:'sepia(.2) contrast(1.05)'}}/>
          <img src="https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=600&q=80" style={{aspectRatio:'3/4',objectFit:'cover',filter:'sepia(.2) contrast(1.05)'}}/>
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80" style={{aspectRatio:'3/4',objectFit:'cover',marginTop:48,filter:'sepia(.2) contrast(1.05)'}}/>
        </div>
      </div>

      {/* timeline */}
      <div style={{marginTop:120,borderTop:'1px solid rgba(31,27,22,.2)',paddingTop:40}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:24}}>
          {[
            ['1952','Garage in Pasadena. First dozen shirts.'],
            ['1961','The Ranchero jacket is patterned.'],
            ['1978','Second workshop opens in Portland.'],
            ['1999','Lifetime repair program begins.'],
            ['2026','Still on the same cutting table.']
          ].map(([y,t])=>(
            <div key={y}>
              <div style={{fontFamily:'DM Serif Display',fontSize:40,color:'var(--camel-dk)',marginBottom:8}}>{y}</div>
              <div style={{fontSize:13,color:'var(--ink-2)',lineHeight:1.5}}>{t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Shop                                                                      */
/* -------------------------------------------------------------------------- */

function Shop({ onAdd, onView, wishlist, onWish, scrollRef }){
  const [cat,setCat]=useState('All');
  const [sort,setSort]=useState('featured');
  const [onlySale,setOnlySale]=useState(false);

  const list = useMemo(()=>{
    let l = PRODUCTS.slice();
    if(cat!=='All') l = l.filter(p=>p.category===cat);
    if(onlySale) l = l.filter(p=>p.sale);
    if(sort==='price-low') l.sort((a,b)=>(a.sale||a.price)-(b.sale||b.price));
    if(sort==='price-high') l.sort((a,b)=>(b.sale||b.price)-(a.sale||a.price));
    if(sort==='year') l.sort((a,b)=>a.year-b.year);
    return l;
  },[cat,sort,onlySale]);

  return (
    <section ref={scrollRef} style={{padding:'120px 32px',background:'var(--cream-2)',borderTop:'1px solid rgba(31,27,22,.1)',borderBottom:'1px solid rgba(31,27,22,.1)'}}>
      <div style={{maxWidth:1440,margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',flexWrap:'wrap',gap:24,marginBottom:48}}>
          <div>
            <div className="mono" style={{color:'var(--camel-dk)',marginBottom:16}}>— Shop the collection</div>
            <h2 style={{fontFamily:'DM Serif Display',fontSize:'clamp(40px, 5vw, 72px)',lineHeight:1,margin:0,letterSpacing:'-.02em'}}>
              The <span style={{fontStyle:'italic'}}>Autumn</span> catalog
            </h2>
          </div>
          <div className="mono" style={{color:'var(--muted)'}}>{list.length} items</div>
        </div>

        {/* filters */}
        <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:16,marginBottom:40,paddingBottom:20,borderBottom:'1px solid rgba(31,27,22,.15)'}}>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {CATEGORIES.map(c=>(
              <button key={c} onClick={()=>setCat(c)} style={{
                padding:'10px 18px',borderRadius:999,
                background:cat===c?'var(--ink)':'transparent',
                color:cat===c?'var(--cream)':'var(--ink)',
                border:'1px solid '+(cat===c?'var(--ink)':'rgba(31,27,22,.25)'),
                fontFamily:'Archivo',fontSize:11,fontWeight:600,letterSpacing:'.1em',textTransform:'uppercase',
                transition:'all .2s'
              }}>{c}</button>
            ))}
            <button onClick={()=>setOnlySale(s=>!s)} style={{
              padding:'10px 18px',borderRadius:999,
              background:onlySale?'var(--rust)':'transparent',
              color:onlySale?'var(--cream)':'var(--rust)',
              border:'1px solid var(--rust)',
              fontFamily:'Archivo',fontSize:11,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase'
            }}>On Sale</button>
          </div>
          <select value={sort} onChange={e=>setSort(e.target.value)} style={{
            padding:'10px 16px',background:'transparent',border:'1px solid rgba(31,27,22,.25)',borderRadius:999,
            fontFamily:'Archivo',fontSize:11,fontWeight:600,letterSpacing:'.1em',textTransform:'uppercase',cursor:'pointer'
          }}>
            <option value="featured">Sort: Featured</option>
            <option value="price-low">Price: low → high</option>
            <option value="price-high">Price: high → low</option>
            <option value="year">Year: oldest</option>
          </select>
        </div>

        {/* grid */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(260px,1fr))',gap:32}}>
          {list.map(p=>(
            <ProductCard key={p.id} p={p} onAdd={onAdd} onView={onView} wished={wishlist.includes(p.id)} onWish={onWish}/>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p, onAdd, onView, wished, onWish }){
  const [hover,setHover]=useState(false);
  const sale = p.sale;
  return (
    <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={{position:'relative'}}>
      <div onClick={()=>onView(p)} style={{
        aspectRatio:'3/4',overflow:'hidden',position:'relative',cursor:'pointer',
        background:'var(--cream)',marginBottom:14
      }}>
        <img src={p.img} style={{
          width:'100%',height:'100%',objectFit:'cover',
          filter:'sepia(.12) contrast(1.03)',
          transition:'transform .5s ease',
          transform: hover?'scale(1.05)':'scale(1)'
        }}/>
        {/* badges */}
        {p.tag && (
          <span style={{
            position:'absolute',top:12,left:12,
            background: p.tag==='SALE'?'var(--rust)': p.tag==='NEW'?'var(--olive)':'var(--ink)',
            color:'var(--cream)',padding:'4px 10px',
            fontFamily:'JetBrains Mono',fontSize:10,letterSpacing:'.15em',fontWeight:600
          }}>{p.tag}</span>
        )}
        <button onClick={(e)=>{e.stopPropagation(); onWish(p.id)}} title="Wishlist" style={{
          position:'absolute',top:10,right:10,width:36,height:36,borderRadius:'50%',
          background:'var(--cream)',display:'flex',alignItems:'center',justifyContent:'center',
          color: wished?'var(--rust)':'var(--ink)',
          transform: hover||wished ? 'scale(1)':'scale(.85)',
          opacity: hover||wished ? 1 : .7,
          transition:'all .2s'
        }}>{Icon.heart(wished)}</button>

        {/* quick add */}
        <div style={{
          position:'absolute',left:12,right:12,bottom: hover?12:-60,
          transition:'bottom .3s ease'
        }}>
          <button onClick={(e)=>{e.stopPropagation(); onAdd(p, p.sizes[Math.floor(p.sizes.length/2)], p.colors[0])}} style={{
            width:'100%',background:'var(--ink)',color:'var(--cream)',padding:'12px',
            fontFamily:'Archivo',fontSize:11,fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',
            display:'flex',alignItems:'center',justifyContent:'center',gap:8
          }}>Quick add <Icon.plus/></button>
        </div>
      </div>

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'start',gap:12}}>
        <div>
          <div className="mono" style={{color:'var(--muted)',marginBottom:4}}>{p.category} · {p.year}</div>
          <div style={{fontFamily:'DM Serif Display',fontSize:18,lineHeight:1.2}}>{p.name}</div>
          <div style={{display:'flex',gap:6,marginTop:8}}>
            {p.colors.map(c=>(
              <div key={c} title={c} style={{width:14,height:14,borderRadius:'50%',background:COLOR_MAP[c],border:'1px solid rgba(31,27,22,.2)'}}/>
            ))}
          </div>
        </div>
        <div style={{textAlign:'right',whiteSpace:'nowrap'}}>
          {sale ? (
            <>
              <div style={{fontFamily:'DM Serif Display',fontSize:18,color:'var(--rust)'}}>${sale}</div>
              <div className="mono" style={{color:'var(--muted)',textDecoration:'line-through'}}>${p.price}</div>
            </>
          ) : (
            <div style={{fontFamily:'DM Serif Display',fontSize:18}}>${p.price}</div>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Product Modal                                                             */
/* -------------------------------------------------------------------------- */

function ProductModal({ p, onClose, onAdd, wished, onWish }){
  const [size,setSize]=useState(p?.sizes[Math.floor(p.sizes.length/2)]);
  const [color,setColor]=useState(p?.colors[0]);
  const [qty,setQty]=useState(1);

  useEffect(()=>{
    if(!p) return;
    setSize(p.sizes[Math.floor(p.sizes.length/2)]);
    setColor(p.colors[0]); setQty(1);
    const esc=(e)=>e.key==='Escape' && onClose();
    window.addEventListener('keydown',esc); return ()=>window.removeEventListener('keydown',esc);
  },[p]);

  if(!p) return null;
  const price = p.sale||p.price;

  return (
    <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(31,27,22,.6)',zIndex:50,display:'flex',alignItems:'center',justifyContent:'center',padding:24,animation:'fadeIn .2s'}}>
      <div onClick={e=>e.stopPropagation()} style={{background:'var(--cream)',maxWidth:1100,width:'100%',maxHeight:'92vh',overflow:'auto',display:'grid',gridTemplateColumns:'1fr 1fr',position:'relative'}}>
        <button onClick={onClose} style={{position:'absolute',top:16,right:16,zIndex:2,background:'var(--cream)',width:40,height:40,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center'}}><Icon.close/></button>

        <div style={{aspectRatio:'4/5',background:'var(--cream-2)'}}>
          <img src={p.img} style={{width:'100%',height:'100%',objectFit:'cover',filter:'sepia(.12) contrast(1.03)'}}/>
        </div>

        <div style={{padding:'48px 40px',display:'flex',flexDirection:'column',gap:20}}>
          <div className="mono" style={{color:'var(--camel-dk)'}}>{p.category} · Est. {p.year}</div>
          <h3 style={{fontFamily:'DM Serif Display',fontSize:40,lineHeight:1,margin:0,letterSpacing:'-.01em'}}>{p.name}</h3>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            {p.sale ? (
              <>
                <span style={{fontFamily:'DM Serif Display',fontSize:26,color:'var(--rust)'}}>${p.sale}</span>
                <span style={{textDecoration:'line-through',color:'var(--muted)'}}>${p.price}</span>
                <span style={{background:'var(--rust)',color:'var(--cream)',padding:'2px 8px',fontSize:10,fontFamily:'JetBrains Mono',letterSpacing:'.1em'}}>SAVE ${p.price-p.sale}</span>
              </>
            ) : <span style={{fontFamily:'DM Serif Display',fontSize:26}}>${p.price}</span>}
          </div>
          <div style={{display:'flex',gap:4,alignItems:'center',color:'var(--camel-dk)'}}>
            <Icon.star/><Icon.star/><Icon.star/><Icon.star/><Icon.star/>
            <span className="mono" style={{color:'var(--muted)',marginLeft:8}}>247 reviews</span>
          </div>

          <p style={{fontSize:14,lineHeight:1.6,color:'var(--ink-2)',margin:0}}>
            Built on our original {p.year} pattern. 14oz cone-mills selvedge denim, copper rivets, triple-stitched seams. Hand-finished at our Portland workshop.
          </p>

          {/* COLOR */}
          <div>
            <div className="mono" style={{marginBottom:10}}>Color — <span style={{color:'var(--camel-dk)'}}>{color}</span></div>
            <div style={{display:'flex',gap:10}}>
              {p.colors.map(c=>(
                <button key={c} onClick={()=>setColor(c)} style={{
                  width:36,height:36,borderRadius:'50%',background:COLOR_MAP[c],
                  border:'2px solid '+(color===c?'var(--ink)':'transparent'),
                  outline:'1px solid rgba(31,27,22,.2)',outlineOffset:color===c?2:0,
                  transition:'all .15s'
                }}/>
              ))}
            </div>
          </div>

          {/* SIZE */}
          <div>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
              <span className="mono">Size</span>
              <a className="mono" style={{color:'var(--camel-dk)',cursor:'pointer'}}>Size guide →</a>
            </div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {p.sizes.map(s=>(
                <button key={s} onClick={()=>setSize(s)} style={{
                  minWidth:48,padding:'10px 14px',
                  background:size===s?'var(--ink)':'transparent',color:size===s?'var(--cream)':'var(--ink)',
                  border:'1px solid '+(size===s?'var(--ink)':'rgba(31,27,22,.25)'),
                  fontFamily:'JetBrains Mono',fontSize:12,fontWeight:600
                }}>{s}</button>
              ))}
            </div>
          </div>

          {/* QTY + CART */}
          <div style={{display:'flex',gap:10,marginTop:12}}>
            <div style={{display:'flex',alignItems:'center',border:'1px solid rgba(31,27,22,.25)'}}>
              <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{padding:'0 14px',height:'100%'}}><Icon.minus/></button>
              <span style={{padding:'0 14px',fontFamily:'JetBrains Mono',fontWeight:600}}>{qty}</span>
              <button onClick={()=>setQty(q=>q+1)} style={{padding:'0 14px',height:'100%'}}><Icon.plus/></button>
            </div>
            <button onClick={()=>{onAdd(p,size,color,qty); onClose()}} style={{...primaryBtn,flex:1,justifyContent:'center',borderRadius:0,padding:'14px'}}>
              Add to cart — ${price*qty}
            </button>
            <button onClick={()=>onWish(p.id)} style={{width:52,border:'1px solid rgba(31,27,22,.25)',display:'flex',alignItems:'center',justifyContent:'center',color:wished?'var(--rust)':'var(--ink)'}}>{Icon.heart(wished)}</button>
          </div>

          <div style={{borderTop:'1px solid rgba(31,27,22,.15)',paddingTop:14,marginTop:8,display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,fontSize:12,color:'var(--muted)'}}>
            <div>✦ Free U.S. shipping over $120</div>
            <div>✦ Lifetime repair guarantee</div>
            <div>✦ 60-day returns</div>
            <div>✦ Ships in 2 business days</div>
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0}}`}</style>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sale Banner                                                               */
/* -------------------------------------------------------------------------- */

function Sale({ onShop }){
  const [t,setT]=useState({d:3,h:14,m:27,s:41});
  useEffect(()=>{
    const i=setInterval(()=>{
      setT(x=>{
        let {d,h,m,s}=x; s--;
        if(s<0){s=59;m--}
        if(m<0){m=59;h--}
        if(h<0){h=23;d--}
        if(d<0){d=0;h=0;m=0;s=0}
        return {d,h,m,s};
      });
    },1000);
    return ()=>clearInterval(i);
  },[]);
  const cell = (n,l)=>(
    <div style={{background:'var(--cream)',color:'var(--ink)',padding:'16px 20px',minWidth:80,textAlign:'center'}}>
      <div style={{fontFamily:'DM Serif Display',fontSize:44,lineHeight:1}}>{String(n).padStart(2,'0')}</div>
      <div className="mono" style={{marginTop:4,color:'var(--muted)'}}>{l}</div>
    </div>
  );
  return (
    <section style={{background:'var(--olive-dk)',color:'var(--cream)',padding:'100px 32px',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:40,right:40,opacity:.15}}>
        <CircleStamp top="summer sale" bottom="ends sunday" middle="40%" size={180}/>
      </div>
      <div style={{maxWidth:1100,margin:'0 auto',display:'grid',gridTemplateColumns:'1.4fr 1fr',gap:60,alignItems:'center'}}>
        <div>
          <div className="mono" style={{color:'var(--camel)',marginBottom:16}}>— End-of-season clearance</div>
          <h2 style={{fontFamily:'DM Serif Display',fontSize:'clamp(56px, 7vw, 96px)',lineHeight:.95,margin:'0 0 28px',letterSpacing:'-.02em'}}>
            <span style={{color:'var(--camel)',fontStyle:'italic'}}>40% off</span><br/>
            selected goods.
          </h2>
          <p style={{fontSize:16,lineHeight:1.6,maxWidth:460,marginBottom:32,opacity:.85}}>
            Every season, we retire a handful of styles to make way for the next. Take them home at cost. Once they're gone, that's all of them.
          </p>
          <button onClick={onShop} style={{...primaryBtn,background:'var(--cream)',color:'var(--ink)'}}>Shop the sale <Icon.arrow/></button>
        </div>
        <div>
          <div className="mono" style={{marginBottom:14,opacity:.7}}>Sale ends in</div>
          <div style={{display:'flex',gap:8}}>
            {cell(t.d,'days')}{cell(t.h,'hrs')}{cell(t.m,'min')}{cell(t.s,'sec')}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Instagram                                                                 */
/* -------------------------------------------------------------------------- */

function Instagram(){
  return (
    <section style={{padding:'120px 32px',maxWidth:1440,margin:'0 auto'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',marginBottom:48,flexWrap:'wrap',gap:16}}>
        <div>
          <div className="mono" style={{color:'var(--camel-dk)',marginBottom:16}}>— @livingvintage.co</div>
          <h2 style={{fontFamily:'DM Serif Display',fontSize:'clamp(40px, 5vw, 72px)',lineHeight:1,margin:0,letterSpacing:'-.02em'}}>
            Worn by <span style={{fontStyle:'italic'}}>people</span>, not models.
          </h2>
        </div>
        <a className="mono" style={{display:'inline-flex',alignItems:'center',gap:10,borderBottom:'1px solid var(--ink)',paddingBottom:6,cursor:'pointer'}}>Follow on Instagram <Icon.arrow/></a>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:4}}>
        {INSTAGRAM.map((src,i)=>(
          <div key={i} style={{aspectRatio:'1/1',overflow:'hidden',position:'relative',cursor:'pointer'}}>
            <img src={src} style={{width:'100%',height:'100%',objectFit:'cover',filter:'sepia(.18) contrast(1.03)',transition:'transform .4s'}}
                 onMouseEnter={e=>e.currentTarget.style.transform='scale(1.06)'}
                 onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}/>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Cart Drawer                                                               */
/* -------------------------------------------------------------------------- */

function CartDrawer({ open, onClose, items, setItems }){
  const subtotal = items.reduce((s,i)=>s+(i.p.sale||i.p.price)*i.qty,0);
  const updateQty = (id,d)=>setItems(items.map(i=>i.id===id?{...i,qty:Math.max(1,i.qty+d)}:i));
  const remove = (id)=>setItems(items.filter(i=>i.id!==id));

  return (
    <>
      <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(31,27,22,.5)',zIndex:40,opacity:open?1:0,pointerEvents:open?'auto':'none',transition:'opacity .25s'}}/>
      <aside style={{
        position:'fixed',top:0,right:0,height:'100vh',width:'min(440px,100vw)',
        background:'var(--cream)',zIndex:41,transform:open?'translateX(0)':'translateX(100%)',
        transition:'transform .3s ease',display:'flex',flexDirection:'column',
        boxShadow:'-20px 0 40px rgba(0,0,0,.15)'
      }}>
        <div style={{padding:'24px 28px',borderBottom:'1px solid rgba(31,27,22,.15)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <div style={{fontFamily:'DM Serif Display',fontSize:24}}>Your bag</div>
            <div className="mono" style={{color:'var(--muted)',marginTop:2}}>{items.length} item{items.length!==1?'s':''}</div>
          </div>
          <button onClick={onClose}><Icon.close/></button>
        </div>

        <div style={{flex:1,overflow:'auto',padding:'12px 28px'}}>
          {items.length===0 ? (
            <div style={{textAlign:'center',padding:'80px 20px',color:'var(--muted)'}}>
              <div style={{fontFamily:'DM Serif Display',fontSize:28,color:'var(--ink)',marginBottom:10,fontStyle:'italic'}}>Empty for now.</div>
              <div className="mono">Something caught your eye?</div>
            </div>
          ) : items.map(i=>(
            <div key={i.id} style={{display:'grid',gridTemplateColumns:'90px 1fr auto',gap:14,padding:'18px 0',borderBottom:'1px dashed rgba(31,27,22,.15)'}}>
              <div style={{aspectRatio:'3/4',overflow:'hidden'}}>
                <img src={i.p.img} style={{width:'100%',height:'100%',objectFit:'cover',filter:'sepia(.12)'}}/>
              </div>
              <div>
                <div style={{fontFamily:'DM Serif Display',fontSize:16,lineHeight:1.2,marginBottom:4}}>{i.p.name}</div>
                <div className="mono" style={{color:'var(--muted)',marginBottom:10}}>{i.color} · size {i.size}</div>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <div style={{display:'flex',alignItems:'center',border:'1px solid rgba(31,27,22,.2)'}}>
                    <button onClick={()=>updateQty(i.id,-1)} style={{padding:'4px 8px'}}><Icon.minus/></button>
                    <span style={{padding:'0 10px',fontFamily:'JetBrains Mono',fontSize:12}}>{i.qty}</span>
                    <button onClick={()=>updateQty(i.id,1)} style={{padding:'4px 8px'}}><Icon.plus/></button>
                  </div>
                  <button onClick={()=>remove(i.id)} className="mono" style={{color:'var(--muted)',textDecoration:'underline'}}>Remove</button>
                </div>
              </div>
              <div style={{fontFamily:'DM Serif Display',fontSize:18}}>${(i.p.sale||i.p.price)*i.qty}</div>
            </div>
          ))}
        </div>

        <div style={{padding:'20px 28px 28px',borderTop:'1px solid rgba(31,27,22,.15)',background:'var(--cream-2)'}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
            <span className="mono">Subtotal</span>
            <span style={{fontFamily:'DM Serif Display',fontSize:22}}>${subtotal}</span>
          </div>
          <div className="mono" style={{color:'var(--muted)',marginBottom:18}}>Shipping & taxes calculated at checkout.</div>
          <button disabled={!items.length} style={{...primaryBtn,width:'100%',justifyContent:'center',borderRadius:0,padding:'16px',opacity:items.length?1:.4,cursor:items.length?'pointer':'not-allowed'}}>Checkout <Icon.arrow/></button>
          <div style={{textAlign:'center',marginTop:12}}>
            <a className="mono" style={{color:'var(--muted)',borderBottom:'1px solid var(--muted)',cursor:'pointer'}}>or continue shopping</a>
          </div>
        </div>
      </aside>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

function Footer(){
  const [email,setEmail]=useState('');
  const [sent,setSent]=useState(false);
  const submit = (e)=>{e.preventDefault(); if(email.includes('@')){setSent(true); setTimeout(()=>{setSent(false);setEmail('')},2500)}};
  return (
    <footer style={{background:'var(--ink)',color:'var(--cream)',padding:'80px 32px 32px'}}>
      <div style={{maxWidth:1440,margin:'0 auto',display:'grid',gridTemplateColumns:'1.5fr 1fr 1fr 1fr',gap:60,paddingBottom:60,borderBottom:'1px solid rgba(244,237,224,.15)'}}>
        <div>
          <div style={{fontFamily:'DM Serif Display',fontSize:40,marginBottom:18}}>
            LivingVintage<span style={{fontStyle:'italic',fontSize:'.5em',verticalAlign:'super',color:'var(--camel)'}}>°</span>
          </div>
          <p style={{maxWidth:360,lineHeight:1.6,opacity:.7,marginBottom:24}}>Letters from the cutting room. New drops, old stories, nothing else. Four times a year.</p>
          <form onSubmit={submit} style={{display:'flex',border:'1px solid rgba(244,237,224,.25)'}}>
            <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@address.com" style={{flex:1,background:'transparent',border:0,padding:'14px 16px',color:'var(--cream)',fontFamily:'JetBrains Mono',fontSize:13,outline:'none'}}/>
            <button style={{padding:'14px 22px',background:'var(--camel)',color:'var(--ink)',fontFamily:'Archivo',fontSize:11,fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase'}}>{sent?'✓ sent':'subscribe'}</button>
          </form>
        </div>
        {[
          ['Shop',['New arrivals','Outerwear','Shirts','Pants','Footwear','Sale']],
          ['The house',['Our story','Workshops','Repair program','Journal','Press']],
          ['Support',['Contact','Size guide','Shipping','Returns','Wholesale']],
        ].map(([h,items])=>(
          <div key={h}>
            <div className="mono" style={{color:'var(--camel)',marginBottom:18}}>— {h}</div>
            <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:10,opacity:.85,fontSize:14}}>
              {items.map(x=><li key={x}><a style={{cursor:'pointer'}}>{x}</a></li>)}
            </ul>
          </div>
        ))}
      </div>

      <div style={{paddingTop:30,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16}}>
        <div className="mono" style={{opacity:.5}}>© 1952–2026 LivingVintage Mfg. Co. · Pasadena · Portland · Brooklyn</div>
        <div className="mono" style={{opacity:.5,display:'flex',gap:18}}>
          <span>Privacy</span><span>Terms</span><span>Accessibility</span>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  App                                                                       */
/* -------------------------------------------------------------------------- */

function App(){
  const [cart,setCart] = useState([]);
  const [wish,setWish] = useState([]);
  const [cartOpen,setCartOpen] = useState(false);
  const [modal,setModal] = useState(null);
  const [toast,setToast] = useState(null);
  const shopRef = useRef(null);

  const onAdd = (p,size,color,qty=1)=>{
    const id = `${p.id}-${size}-${color}`;
    setCart(c=>{
      const ex = c.find(i=>i.id===id);
      if(ex) return c.map(i=>i.id===id?{...i,qty:i.qty+qty}:i);
      return [...c,{id,p,size,color,qty}];
    });
    setToast(`${p.name} — added to bag`);
    setTimeout(()=>setToast(null),2200);
  };

  const toggleWish = (id)=>setWish(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);

  const scrollToShop = ()=>{
    const el = shopRef.current;
    if(!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 40;
    window.scrollTo({top:y,behavior:'smooth'});
  };

  const cartCount = cart.reduce((s,i)=>s+i.qty,0);

  return (
    <>
      <Announce/>
      <Header cartCount={cartCount} wishCount={wish.length} onCart={()=>setCartOpen(true)} onWish={()=>{}} onShop={scrollToShop}/>
      <Hero onShop={scrollToShop}/>
      <Marquee/>
      <Story/>
      <Shop scrollRef={shopRef} onAdd={onAdd} onView={setModal} wishlist={wish} onWish={toggleWish}/>
      <Sale onShop={scrollToShop}/>
      <Instagram/>
      <Footer/>

      <CartDrawer open={cartOpen} onClose={()=>setCartOpen(false)} items={cart} setItems={setCart}/>
      <ProductModal p={modal} onClose={()=>setModal(null)} onAdd={onAdd} wished={modal?wish.includes(modal.id):false} onWish={toggleWish}/>

      {toast && (
        <div style={{position:'fixed',bottom:30,left:'50%',transform:'translateX(-50%)',background:'var(--ink)',color:'var(--cream)',padding:'14px 24px',fontFamily:'JetBrains Mono',fontSize:12,letterSpacing:'.1em',textTransform:'uppercase',zIndex:60,animation:'up .3s ease',boxShadow:'0 10px 30px rgba(0,0,0,.3)'}}>
          ✓ {toast}
        </div>
      )}
      <style>{`@keyframes up{from{opacity:0;transform:translate(-50%,20px)}}`}</style>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
