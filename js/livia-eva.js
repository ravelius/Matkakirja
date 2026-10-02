/* Pulun EVA-varusteet ovat omaa vektoripiirrosta saman paperinuken koordinaateissa.
 * Kaikki valot ja turvaköysi palautetaan erikseen, jotta päivän ja yön voimakkuus
 * voidaan säätää ilman, että perushahmon värit tai alpha muuttuvat.
 *
 * LIVIAN AVARUUSKÄVELYASU (Codex 30.9.2026; ohje siirretty docs/moduulit/livia-eva.md:stä tähän).
 * Pulun nykyinen SVG-pää ja livia-astronauttikypara-2x.png säilyvät. Tämä moduuli piirtää puvun,
 * repun, rintapaneelin, turvaköyden ja kolme erillistä valoryhmää samoihin js/livia-svg.js-paperinuken
 * koordinaatteihin. Varjossa oleva peruskuva sisältää puvun, nykyiset kasvot ja visiirin, mutta ei
 * valoja tai köyttä.
 *
 * Webin `astronautti: true` pukee EVA-asun. Ryhmien voimakkuutta säädetään .livia-lentonayttamo-elementin
 * (tai sen esivanhemman) CSS-muuttujilla --livia-eva-kasvovalo, --livia-eva-kyparalamput ja
 * --livia-eva-maavalo (0–1); ISS:n valon mukaan ne asettaa js/linssit/pulu-eva-valo.js. `evaValot: false`
 * sammuttaa kaikki valoryhmät ja `evaTether: false` jättää turvaköyden pois (kerrosvienti). Viiden
 * sekunnin, 5 px:n ja ±3°:n leijunta sekä puheen aikainen pysähdys jäävät css/satelliitti.css:ään.
 *
 * Robotin jalkatuki on valinnainen `evaRobottikasi: true` -tila. Se korvaa vapaan köyden
 * varren koukkuun kiinnitetyllä lenkillä, piirtää kiinteän varren hahmon taakse ja
 * jalkapidikkeet kenkiin. Webin 152 × 304 -ikkunassa sommitelmaa nostetaan 75 yksikköä,
 * jotta varsi todella näkyy alareunasta; natiivin kerrokset pysyvät 152 × 304 -ankkurissa.
 * Vain paperinukke saa keinua ±2° kuudessa sekunnissa, varsi ei liiku. Varren sininen
 * reunavalo käyttää --livia-eva-varsi-reunavalo-muuttujaa, joka seuraa Maan valoa.
 * Natiivin lisäkerrokset ovat robotin-varsi/reunavalo (304 × 1600) ja
 * robotin-turvakoysi/pidikkeet (304 × 608), kaikki samasta vasemmasta ylänurkasta.
 *
 * Natiivin läpinäkyvät 2× PNG:t (assets/livia/livia-eva-{turvakoysi,perus,kasvovalo,kyparalamput,maavalo}-2x.png)
 * ovat kaikki 304 × 608 ja vastaavat samaa 152 × 304 SVG-näkymää; kerrokset samaan suorakulmioon ilman
 * siirtoa tai skaalaeroa tässä järjestyksessä: turvaköysi hahmon taakse, perus, kasvovalo, kypärälamput,
 * maavalo. Natiivissa samat kuvat ovat Resources/LiviaEva-kansiossa (LiviaKuva.Eva): kun kuvat korjataan,
 * ne vaihdetaan molempiin. Puku ja valot ovat omaa vektoripiirrosta, eikä niissä ole tekstiä tai
 * kolmannen osapuolen kuvia. */

/*
 * KORJAUKSET MOOTTORISSA (omistaja 30.9.2026 klo 23.5x: "codex ei näytä saavan hyvää versiota aikaiseksi"): hahmo leikkautui
 * oikeasta reunasta (viewBox x = 152) → koko asu ja köysi siirtyvät 10 yksikköä vasemmalle (LIVIAN_EVA_SIIRTO); varjossa oleva
 * hahmo tummemmaksi (livianEvaVarjoDef: kirkkaus 0,68, hieman kylmempi); Maan valo pehmeäksi (sumennus 1,8 ja himmeämpi väri).
 * Natiivin 2×-kerroskuvat viedään samoista SVG:istä (tools/vie-livia-eva.mjs).
 */
export const LIVIAN_EVA_SIIRTO = 'translate(-10 0)';

/** Varjossa olevan hahmon tummennus (puku, pää ja kypärä; valot jäävät sen päälle kirkkaina). */
export const livianEvaVarjoDef = prefix => `<defs><filter id="${prefix}-eva-varjo" color-interpolation-filters="sRGB"><feComponentTransfer><feFuncR type="linear" slope=".64"/><feFuncG type="linear" slope=".68"/><feFuncB type="linear" slope=".76"/></feComponentTransfer></filter></defs>`;

export const LIVIAN_EVA_KERROKSET = Object.freeze(['perus', 'kasvovalo', 'kypärälamput', 'maavalo', 'turvaköysi']);
export const LIVIAN_EVA_ROBOTTI_KERROKSET = Object.freeze(['varsi', 'reunavalo', 'turvaköysi', 'pidikkeet']);

export function livianEvaPuku() {
  return `<g data-part="eva-puku" stroke-linejoin="round" stroke-linecap="round">
    <path d="M120 136Q135 129 144 139L149 151L147 170Q143 177 131 175L122 166Z" fill="#53666d" stroke="#354b56" stroke-width="2.6"/>
    <path d="M129 138Q139 135 144 143L146 161Q144 170 137 171L129 165Z" fill="#9caeb2" stroke="#d6dee0" stroke-width="2"/>
    <path d="M135 143L143 145M135 151L144 153M135 159L143 161" fill="none" stroke="#657a83" stroke-width="1.6"/>
    <path d="M83 145Q77 142 72 149L67 164Q65 171 72 174L82 171L90 157Z" fill="#a9b9be" stroke="#455d69" stroke-width="2.4"/>
    <path d="M73 152Q68 157 69 165L75 168M78 149L85 153M70 170L76 172" fill="none" stroke="#e5ebea" stroke-width="2"/>
    <path d="M75 169Q69 166 66 171L67 179Q72 185 80 181L84 174Z" fill="#c6d1d2" stroke="#556b75" stroke-width="2"/>
    <path d="M83 136Q91 128 106 129Q123 128 133 140L137 165Q133 178 121 181L91 181Q78 174 80 158Z" fill="#c2cfd1" stroke="#465d68" stroke-width="2.8"/>
    <path d="M84 140Q91 135 97 135Q90 150 93 173L87 174Q78 158 84 140Z" fill="#e0e7e6"/>
    <path d="M120 135Q134 141 133 157L135 166Q132 176 124 179L116 179Q123 165 120 135Z" fill="#90a3a8"/>
    <path d="M88 158Q101 164 114 160M88 170Q102 175 123 169" fill="none" stroke="#728791" stroke-width="1.5"/>
    <path d="M90 171L105 171L106 180Q101 184 92 181Z M109 171L123 170L127 180Q121 184 113 181Z" fill="#b3c3c7" stroke="#506771" stroke-width="2.2"/>
    <path d="M92 176L103 176M113 176L124 175" fill="none" stroke="#e5ebea" stroke-width="2"/>
    <path d="M89 179Q97 177 105 180L107 184Q102 188 88 185Z M111 180Q119 177 126 179L129 185Q122 188 111 185Z" fill="#7e969e" stroke="#455d69" stroke-width="2"/>
    <path d="M88 184L106 184M112 185L128 184" fill="none" stroke="#d7e2e3" stroke-width="1.7"/>
    <path d="M126 140Q136 138 140 147L148 161Q151 168 145 173L138 174Q130 167 126 158Z" fill="#b8c8cb" stroke="#4a626d" stroke-width="2.4"/>
    <path d="M134 145Q140 148 143 158M138 164L146 169" fill="none" stroke="#e7ece9" stroke-width="1.8"/>
    <path d="M141 169Q145 166 150 170L154 177Q154 183 147 184L138 179Z" fill="#d1dadd" stroke="#516975" stroke-width="2.1"/>
    <path d="M144 173L151 178M141 177L149 181" fill="none" stroke="#879ba3" stroke-width="1.4"/>
  </g>`;
}

export function livianEvaEtukerros() {
  return `<g data-part="eva-rinta" stroke-linecap="round" stroke-linejoin="round">
    <path d="M81 148Q93 155 108 155Q123 155 131 148L133 155Q121 164 107 164Q93 163 81 156Z" fill="#647b84" stroke="#354f5c" stroke-width="2"/>
    <path d="M86 153Q106 163 127 153" fill="none" stroke="#e1e9e7" stroke-width="2"/>
    <path d="M94 158L91 167M121 158L124 168" fill="none" stroke="#738a93" stroke-width="3"/>
    <rect x="98" y="161" width="20" height="12" rx="2.5" fill="#4f6873" stroke="#324b57" stroke-width="1.5"/>
    <rect x="101" y="164" width="9" height="5" rx="1" fill="#8faeb3"/>
    <circle cx="114" cy="166" r="1.5" fill="#dfb981"/><circle cx="114" cy="170" r="1.5" fill="#c3d6dc"/>
    <path d="M101 171H110" stroke="#b7c8cc" stroke-width="1.2"/>
    <path d="M133 166Q138 167 139 173" fill="none" stroke="#5d757f" stroke-width="3"/>
    <circle cx="139" cy="174" r="3" fill="#dce6e5" stroke="#536e78" stroke-width="1.5"/>
  </g>`;
}

export function livianEvaTether() {
  // Tämä on SVG:n 152 × 304 -näkymässä linnun takana, mutta omassa kerroksessaan.
  return `<g data-part="eva-turvaköysi" fill="none" stroke-linecap="round">
    <path d="M0 277C34 262 52 267 73 281S116 288 143 294" stroke="#243b4a" stroke-opacity=".78" stroke-width="3.2"/>
    <path d="M0 276C34 261 52 266 73 280S116 287 143 293" stroke="#d2dfe1" stroke-width="2"/>
    <path d="M121 290Q128 288 134 291" stroke="#8da6af" stroke-width="3.4"/>
  </g>`;
}

/* Robotin ylin nivel ja jalkatuki ovat Pulun 152 × 304 -ruudussa. Alempi
 * varsiosa jatkuu samassa koordinaatistossa y=800:aan, joten natiivi voi
 * ankkuroida pitkän kuvan ikkunan reunaan ilman hahmon venyttämistä. */
export function livianEvaRobotinVarsi(prefix='livia') {
  return `<defs>
    <linearGradient id="${prefix}-robotin-kuori" x1="0" y1="0" x2="1" y2=".22"><stop stop-color="#5c737d"/><stop offset=".24" stop-color="#dce5e5"/><stop offset=".59" stop-color="#f2f1e9"/><stop offset="1" stop-color="#91a5ad"/></linearGradient>
    <linearGradient id="${prefix}-robotin-kansi" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#eef0e9"/><stop offset=".55" stop-color="#b7c7cb"/><stop offset="1" stop-color="#536d7a"/></linearGradient>
  </defs><g data-part="eva-robotin-varsi" stroke-linejoin="round" stroke-linecap="round">
    <path d="M148 800C141 746 104 663 72 587S42 533 48 527M49 526C70 493 117 435 125 409M126 409L118 317" fill="none" stroke="#344b57" stroke-width="4.4"/>
    <path d="M145 800C135 741 96 653 66 583S42 529 47 525M48 524C69 492 117 436 123 408M125 407L116 317" fill="none" stroke="#99aeb6" stroke-width="1.8"/>
    <path d="M132 800L52 555L38 529L56 516L72 539L151 784Z" fill="url(#${prefix}-robotin-kuori)" stroke="#354c58" stroke-width="3"/>
    <path d="M49 531L59 544L141 790" fill="none" stroke="#f7f6ed" stroke-width="2.6"/>
    <path d="M56 548L130 770M61 556L136 780" fill="none" stroke="#6f8994" stroke-width="1.1"/>
    <path d="M38 522L114 403L133 414L56 532Z" fill="url(#${prefix}-robotin-kuori)" stroke="#354c58" stroke-width="3"/>
    <path d="M49 522L121 410M56 527L127 417" fill="none" stroke="#f5f4ea" stroke-width="2.4"/>
    <path d="M118 411L109 331L125 325L134 407Z" fill="url(#${prefix}-robotin-kuori)" stroke="#354c58" stroke-width="2.7"/>
    <path d="M114 336L123 401" fill="none" stroke="#f7f6ec" stroke-width="2.1"/>
    <g fill="#607885" stroke="#314b58" stroke-width="2.5"><circle cx="47" cy="526" r="14"/><circle cx="125" cy="409" r="12"/><circle cx="118" cy="326" r="11"/></g>
    <g fill="#dbe4e4" stroke="#7d949b" stroke-width="1.7"><circle cx="47" cy="526" r="9"/><circle cx="125" cy="409" r="7.5"/><circle cx="118" cy="326" r="6.5"/></g>
    <g fill="#536c79"><circle cx="47" cy="526" r="3"/><circle cx="125" cy="409" r="2.5"/><circle cx="118" cy="326" r="2.3"/></g>
    <path d="M101 312L108 326L115 328M134 311L127 326L121 328" fill="none" stroke="#405964" stroke-width="6"/>
    <path d="M101 312L108 326L115 328M134 311L127 326L121 328" fill="none" stroke="#d9e4e2" stroke-width="3"/>
    <path d="M91 299Q117 297 143 299L147 307Q123 314 94 310Z" fill="url(#${prefix}-robotin-kansi)" stroke="#354d59" stroke-width="2.6"/>
    <path d="M95 300Q118 298 142 300M98 306Q120 309 142 305" fill="none" stroke="#f7f7ee" stroke-width="1.8"/>
    <path d="M142 307L142 284Q142 281 145 281Q148 281 148 284L148 314" fill="none" stroke="#425a66" stroke-width="5"/>
    <path d="M143 307L143 284Q143 282 145 282Q147 282 147 284L147 314" fill="none" stroke="#d9e4e4" stroke-width="2.3"/>
    <path d="M139 309L150 309" stroke="#7c919b" stroke-width="3"/>
    <path d="M109 345L125 343M112 353L128 351M115 360L130 358M77 468L91 477M73 475L86 484M68 482L81 491M72 590L92 584M77 604L98 598" stroke="#586f7c" stroke-width="2"/>
    <g fill="#8da4ac" stroke="#3d5662" stroke-width="1.2"><rect x="112" y="365" width="17" height="7" rx="2" transform="rotate(-7 120 368)"/><rect x="67" y="488" width="18" height="7" rx="2" transform="rotate(36 76 491)"/><rect x="67" y="606" width="18" height="7" rx="2" transform="rotate(72 76 609)"/></g>
  </g>`;
}

export function livianEvaRobotinPidikkeet() {
  return `<g data-part="eva-robotin-pidikkeet" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M104 294V301Q108 305 113 302V294M118 294V301Q122 305 127 302V294" stroke="#344d59" stroke-width="3.6"/>
    <path d="M104 294V300Q108 303 113 301V294M118 294V300Q122 303 127 301V294" stroke="#e7e8de" stroke-width="1.8"/>
    <path d="M98 304L136 304" stroke="#738b96" stroke-width="1.2"/>
  </g>`;
}

export function livianEvaRobotinTurvakoysi() {
  return `<g data-part="eva-robotin-turvaköysi" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M129 291C106 279 83 283 82 299C80 319 111 326 135 314" stroke="#304a58" stroke-width="3.4"/>
    <path d="M129 291C106 279 83 283 82 299C80 319 111 326 135 314" stroke="#dce7e5" stroke-width="1.8"/>
    <circle cx="129" cy="291" r="3.4" fill="#657f89" stroke="#e4e9e5" stroke-width="1.4"/>
    <circle cx="134" cy="314" r="4.3" fill="#566f7b" stroke="#dbe5e4" stroke-width="1.5"/>
    <path d="M134 311Q139 308 141 311L139 317Q136 320 133 317" stroke="#dce5e2" stroke-width="2"/>
  </g>`;
}

export function livianEvaRobotinReunavalo(prefix='livia') {
  return `<defs><linearGradient id="${prefix}-robotin-reunavalo" x1="0" y1="1" x2="0" y2="0"><stop stop-color="#a8d8f7" stop-opacity=".54"/><stop offset=".8" stop-color="#7dbce6" stop-opacity=".24"/><stop offset="1" stop-color="#7dbce6" stop-opacity=".08"/></linearGradient><filter id="${prefix}-robotin-hehku" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="2"/></filter></defs>
  <g data-part="eva-robotin-reunavalo" fill="none" stroke="url(#${prefix}-robotin-reunavalo)" stroke-linecap="round" stroke-linejoin="round">
    <path d="M94 308Q116 313 143 307M112 330L120 407L39 522L132 799" stroke-width="7" filter="url(#${prefix}-robotin-hehku)"/>
    <path d="M94 308Q116 313 143 307M112 330L120 407L39 522L132 799" stroke-width="2.2"/>
    <path d="M31 526Q40 542 54 533M115 409Q123 420 132 414" stroke-width="2"/>
  </g>`;
}

const evaValoDef = prefix => `<defs>
  <radialGradient id="${prefix}-eva-face"><stop stop-color="#ffe6b8" stop-opacity=".8"/><stop offset=".43" stop-color="#ffd5a0" stop-opacity=".34"/><stop offset="1" stop-color="#ffd0a0" stop-opacity="0"/></radialGradient>
  <radialGradient id="${prefix}-eva-lamp"><stop stop-color="#fff" stop-opacity=".88"/><stop offset=".18" stop-color="#f1faff" stop-opacity=".55"/><stop offset="1" stop-color="#daeefa" stop-opacity="0"/></radialGradient>
  <linearGradient id="${prefix}-eva-earth" x1="0" y1="1" x2="0" y2="0"><stop stop-color="#8cc6ee" stop-opacity=".5"/><stop offset="1" stop-color="#8cc6ee" stop-opacity="0"/></linearGradient>
  <filter id="${prefix}-eva-pehmea" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.8"/></filter>
  <clipPath id="${prefix}-eva-visor"><ellipse cx="100" cy="113" rx="41" ry="40"/></clipPath>
</defs>`;

export function livianEvaValo(kerros, prefix='livia') {
  if (kerros === 'kasvovalo') return `${evaValoDef(prefix)}<g data-part="eva-kasvovalo" clip-path="url(#${prefix}-eva-visor)"><ellipse cx="93" cy="105" rx="49" ry="43" fill="url(#${prefix}-eva-face)"/><path d="M62 126Q93 145 126 127" fill="none" stroke="#f4d5aa" stroke-opacity=".3" stroke-width="3"/></g>`;
  if (kerros === 'kypärälamput') return `${evaValoDef(prefix)}<g data-part="eva-kyparalamput"><circle cx="52" cy="110" r="10" fill="url(#${prefix}-eva-lamp)"/><circle cx="149" cy="109" r="10" fill="url(#${prefix}-eva-lamp)"/><circle cx="52" cy="110" r="3" fill="#f9fcfc"/><circle cx="149" cy="109" r="3" fill="#f9fcfc"/><circle cx="52" cy="110" r="1.5" fill="#fff"/><circle cx="149" cy="109" r="1.5" fill="#fff"/></g>`;
  if (kerros === 'maavalo') return `${evaValoDef(prefix)}<g data-part="eva-maavalo" filter="url(#${prefix}-eva-pehmea)" fill="none" stroke="url(#${prefix}-eva-earth)" stroke-linecap="round"><path d="M72 165Q82 181 95 187M108 190Q130 192 150 178M61 132Q58 151 68 162M138 138Q145 151 150 164" stroke-width="4"/><path d="M77 170Q87 183 99 187M116 187Q134 187 147 177" stroke-width="2"/></g>`;
  return '';
}
