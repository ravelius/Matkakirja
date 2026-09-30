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
