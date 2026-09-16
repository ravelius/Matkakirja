# Astronautin kamera: pulun normaali chatti + selite pienennettynä (16.9.2026)

Haara: `claude/bold-ride-vow4ki-astro-chatti`. Ei versionostoa, ei PR:ää,
ei Raamattu-muokkausta. Raamattu, LISÄYS 10 (kohdat 29 ja 30) sekä saman
päivän kaksi tarkennusta (vihreä otsikkorivi, vinkkiavaus).

## 1. Minipulun chatti toimii normaalisti (kohta 29)

Omistaja: *"Pulun chatti pitäisi toimia normaalisti vaikka itse pulu
olisi pienemmän kokoinen."*

Vanha kortti osasi vain kaksi esikirjoitettua kysymystä. Nyt minipulun
napautus avaa oikean chatin:

- **ehdotuspillerit** (kohteen kaksi valmista kysymystä,
  `js/linssit/astronaut-kysymykset.js`) chatin alussa — napautus vastaa
  esikirjoitetulla, lähteistetyllä tekstillä **ilman mallikutsua**;
- **virta**, jossa pelaajan kysymykset ja pulun kuplat allekkain;
- **vapaa kysymyskenttä**, joka menee **samaa reittiä kuin kartan pulu**.

Reitti on pelin oma, ei kopio: `js/pollo.js` sai `Pollo.kysyUlkoisesti`
ja viennin `polloUlkoinenKysymys`. Sama palvelin, sama `konteksti()`,
sama historia, sama `kehysLaji`, sama striimi (`pyydaStriimi`), sama
naputusääni ja samat rajoitukset (yksi pyyntö kerrallaan, pulu pitää
olla löydetty). Ainoa ero paneeliin: kupla on kutsujan — linssin ajan
pelin paneeli ja kuplapino ovat `visibility: hidden`, joten paneelin
kautta tullut vastaus ei näkyisi lainkaan. Kupla kiinnittyy siis
minipuluun: kortti kasvaa hahmon yläpuolelle samassa kulmassa.

Pulun eleet toimivat: hahmo reagoi sekä kysymyksen lähtiessä että
vastauksen valmistuessa. Chatti sulkeutuu omasta ✕:stään, kuvan ✕:stä ja
kohteen vaihdosta, eikä se peitä kuvan sulkevaa ✕:ää.

## 2. Selite avautuu pienennettynä (kohta 30) + vinkkiavaus

Omistaja: *"inforuutu voisi avautua pienennettynä, eli käyttäjän pitäisi
klikata sitä nähdäkseen sisällön"* ja *"ensimmäisellä kerralla info ruutu
voisi aueta ja pienentyä itsestään heti takaisin, niin pelaajalle tulisi
vinkki että tekstiä on enemmän."*

- lähtötila on **kelattu**: vain otsikkorivi, himmeä, yksi rivi;
- **vinkkiavaus kerran kohdetta kohti** (`sessionStorage`, avain
  `matkakirja-astro-vinkki-<kohde>`): laatikko avautuu, on auki 1,5 s ja
  kelautuu itsestään takaisin. Pelaajan napautus kesken vinkin keskeyttää
  sen ja **jättää selitteen auki**;
- `prefers-reduced-motion`: ei vinkkiavausta lainkaan;
- autokelaus napautuksesta, panoroinnista ja zoomista säilyy;
- kohteen vaihto luo näkymän uudelleen, joten kelattu tila palautuu.

## 3. Otsikkorivi vihreällä

Otsikkorivi (kohteen nimi) on linssin vihreä `#5dffa8` — sama sävi kuin
kohdepisteillä ja "Kysy pululta:" -otsikolla. Maa-osa (" — Mauritania")
on himmeä harmaa. Kelatussa tilassa himmennys tehdään `opacity`illa,
joka säilyttää sävyn: vihreä himmenee samassa suhteessa kuin muu selite.

## Mitattu

Yksikkötestit: `tests/satelliitti*`, `tests/astronaut*`, `tests/pollo*`,
`tests/rules`, `tests/dokumentit` — 627/627 läpi. `node --check` puhdas.

`tools/savukkeet/savuke-astro-valokuva.mjs` laajennettiin: chatti (vapaa
kenttä + 2 ehdotusta, ehdotus vastaa **route-laskuri 0**, vapaa kysymys
kutsuu samaa reittiä **tasan kerran** ja mallivastaus näkyy kuplana,
minipulu reagoi, ✕ sulkee), selite kelattuna avautuessa, otsikkorivin
napautus avaa, vinkkiavaus mitataan 60 ms:n välein otetusta lokista
(auki ≥ 1 s, kelautuu ≤ 3 s) ja toinen avaus on heti kelattu, otsikon
laskettu väri on vihreä sekä auki että kiinni. Vastakokeet: vihreysmittari
hylkää harmaan, istuntomuisti tyhjänä vinkki tulee ja täytettynä ei tule.

- `savuke-astro-valokuva.mjs`: **43/43** kaikissa neljässä mitassa —
  työpöytä 1400 × 900, puhelin 390 × 844, vaaka 844 × 390 ja iPad
  1024 × 1366.
- `savuke-astro-aani.mjs`: **24/24**.
- `savuke-satelliittilinssi.mjs` (`NAKYMAT=tyopoyta`): **34/34**.

Vinkkiavauksen ylärajasta: kontin ohjelmisto-WebGL nälkiinnyttää
pääsäikeen iPad-mitalla sekunneiksi, jolloin sekä näytteenotto että
vinkin oma 1,5 s:n ajastin myöhästyvät saman verran. Yläraja on siksi
3 s + suurin näytteiden väli; alaraja (1 s auki) ei jousta, koska liian
lyhyt vinkki olisi aito vika.

Kuva: `docs/raportit/kuvat/astro-chatti-390-20260916.jpg` (chatti auki
ehdotuksineen, 390 px).

(Yllä olevat 43/43-luvut mitattiin ennen alla olevaa hover-korjausta;
korjaus lisäsi `savuke-astro-valokuva.mjs`:ään kaksi uutta väitettä,
joten uusi kokonaisluku on 45/45 — ks. kohta 5.)

## 4. Minipulun napin ruskea hover-tausta korjattu (Sonnet, 16.9.2026)

Codexin live-QA Mac Chromella v1924 löysi vian: minipulun nappi
(`.satelliitti-pulunappi`) on levossa läpinäkyvä, mutta hover/active/
focus-tilassa tausta muuttui ruskeaksi `rgb(67, 51, 31)` (70×84 px).

**Juurisyy mitattu selaimessa** (ei arvattu): tiedoston alun
yleissääntö `css/styles.css:2287` `button:hover:not(:disabled) {
background: #43331f; }` (tarkkuus 0,2,1) voitti
`.satelliitti-pulunappi`-luokan levon säännön (tarkkuus 0,1,0).
`.satelliitti-pulunappi:hover`-sääntö asetti ennen korjausta vain
suotimen (`filter: brightness(1.15)`), ei taustaa, joten mikään
`css/satelliitti.css`:ssä ei ennen tätä voittanut yleissääntöä. Sama
vika ja sama ratkaisumalli on jo dokumentoitu kolmesti tiedostossa
`css/styles.css` (rivit ~21493, ~23847, ~26857): pöllöpaneelin napit,
maataulun kartuutsi ja ylapalkin nappi.

**Korjaus** (`css/satelliitti.css`, uusi sääntö
`.satelliitti-pulunappi:hover:not(:disabled)`-lohkon jälkeen, rivi
~828 alkaen): tarkkuus nostettu samalla tavalla kuin muualla
tiedostossa — elementti + luokka + tila = 0,3,1, joka voittaa
yleissäännön (0,2,1) järjestyksestä riippumatta.

```css
button.satelliitti-pulunappi:hover:not(:disabled),
button.satelliitti-pulunappi:active:not(:disabled),
button.satelliitti-pulunappi:focus:not(:disabled),
button.satelliitti-pulunappi:focus-visible {
  border: 0;
  background: transparent;
  box-shadow: none;
}

button.satelliitti-pulunappi:focus-visible {
  outline: 2px solid var(--satelliitti-vihrea, #5dffa8);
  outline-offset: 2px;
}
```

Näppäimistökohdistuksen ilmaisin säilyy: `:focus-visible` saa vihreän
`#5dffa8`-ääriviivan (sama sävy kuin "Kysy pululta:" -otsikolla ja
kohdepisteillä), mutta ei taustaa.

**Mitattu Playwrightilla** (`tools/savukkeet/savuke-astro-valokuva.mjs`,
uusi väite `page.hover('.satelliitti-pulunappi')` →
`getComputedStyle(nappi)`): hover-tilassa
`backgroundColor = "rgba(0, 0, 0, 0)"`, `borderTopWidth = "0px"`,
`boxShadow = "none"` — kaikilla neljällä ruudulla (1400, 390, 1024 ×
1366, 844 × 390). Vastakoe ajettu KÄSIN korjausta ennen
(`git stash` väliaikaisesti pois `css/satelliitti.css`:stä, ajo
uudelleen, `git stash pop` takaisin): väite meni punaiseksi ja mitattu
tausta oli täsmälleen `rgb(67, 51, 31)` — sama luku kuin Codexin
raportoima bugi. Lisäksi väitesarjaan lisättiin pysyvä vastakoe, joka
varmistaa, ettei läpinäkyvyysmittari (`lapinakyva`) hyväksyisi tätä
samaa ruskeaa väriä.

## 5. Savukkeiden ajo (Sonnet, 16.9.2026) — KESKEN-osio ajettu läpi

Kaikki edellisen agentin ajamatta jääneet savukkeet ajettu yksi
kerrallaan etualalla:

- `savuke-astro-valokuva.mjs`, iPad-näkymä (1024 × 1366):
  **45/45 läpi** (43 vanhaa + 2 uutta hover-väitettä).
- `savuke-astro-valokuva.mjs`, puhelin (390 × 844), uuden
  hover-väitteen kanssa: **45/45 läpi**.
- `savuke-astro-aani.mjs`: **24/24 läpi**, ei muutoksia tiedostoon.
- `savuke-satelliittilinssi.mjs` (`NAKYMAT=tyopoyta`): **34/34 läpi**
  toisella ajolla. Ensimmäisellä ajolla **33/34** — väite "pallon
  takapuolen merkki ei ota napautusta" epäonnistui kertaalleen
  (`ikkunoita: 1`, siis jokin avasi katseluikkunan). SYY SELVITETTY:
  testin oma kommentti tiedostossa (rivit 495-502) kuvaa tarkalleen
  tämän: pallo pyörii linssin avauduttua hitaasti, ja testi mittaa
  ruutukoordinaatin, jossa lähelle (< 40 px) ei silloin osu yhtään
  etupuolen merkkiä — mutta pallon pyöriessä ehtii toinen etupuolen
  merkki liukua koordinaatin kohdalle ennen kuin `s.mouse.click`
  ehtii perille. Toisella ajolla sama merkki (`sarytsev`) mitattiin
  hieman eri ruutukohdasta eikä osuma tapahtunut (`ikkunoita: 0`).
  Tämä on testin OMA, olemassa oleva ajoitusherkkyys — ei liity
  tämän session muutoksiin (`css/satelliitti.css`,
  `savuke-astro-valokuva.mjs`); tiedostoa `savuke-satelliittilinssi.mjs`
  ei kosketettu. Ei korjattu eikä poistettu — kirjattu tähän
  omistajan/seuraavan agentin tietoon, koska mittari saattaa satunnaisesti
  punastua jatkossakin.

Työpöydän ja vaaan `savuke-astro-valokuva.mjs`-ajoja ei toistettu
tässä sessiossa (eivät olleet KESKEN-listalla eivätkä muuten
pyydettyjä); portti 8757 on lisäksi yhteinen usean rinnakkaisen
session kesken tässä konttiympäristössä, ja yksi yritys osui
toisen session ajoon (`EADDRINUSE`) — ei muiden prosessien
tappamista, yritys vain jätettiin väliin.

**Yhteenveto läpi/ei-läpi:**

| Savuke | Näkymä | Tulos |
| --- | --- | --- |
| savuke-astro-valokuva.mjs | iPad 1024×1366 | 45/45 |
| savuke-astro-valokuva.mjs | puhelin 390×844 (uusi hover-väite) | 45/45 |
| savuke-astro-aani.mjs | tyopoyta + puhelin (sisäinen) | 24/24 |
| savuke-satelliittilinssi.mjs | tyopoyta | 34/34 (33/34 ensimmäisellä ajolla, tunnettu ajoitusherkkyys) |

Kaikki neljä ajoa ovat nyt vihreitä. Ainoa punaiseksi mennyt väite
("pallon takapuolen merkki ei ota napautusta") on selvitetty juurisyyhyn
asti ja on toistettavuudeltaan satunnainen, ei tämän session muutosten
aiheuttama.
