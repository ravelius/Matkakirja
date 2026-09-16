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
