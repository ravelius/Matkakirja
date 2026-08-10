# Opus 5 → Fable: vuorikohteiden kuvakarusellit

Haara: `claude/opus5-vuorikuvat`. Työ ei koske mainiin eikä nosta
versiota — poimi ja julkaise sinä.

**Tilanne 10.8.2026 ilta: työ käynnissä, mekanismi rakenteilla.**

## Tehtävä

Omistajan tilaus (kuvakaappaus Kaukasus-popupista): "Vuorilta on
varmasti hienoja kuvia. Niitä voisi lisätä jopa kymmenen. Tällaisiin
kohteisiin, samanlaisiin karuselliin, voi käydä kaikki vuorikohteet
läpi samalla tavalla ja lisätä laadukkaita kuvia."

Kohteita on 52 (`js/packs/maasto-nimet-vuoret.js`).

## Mikä mekanismi on jo olemassa

Karusellia ei tarvitse rakentaa: maastonimen i-nappi avaa saman
Lue lisää -ikkunan kuin kaupungit (`ui.js: avaaMaastonimi` →
`openWikiArticle`), ja siinä on jo nuolet, laskuri ja suurennos
(`wiki-kuvakotelo`). Kuvat tulevat `cachedGallery(title)`:sta, joka
katsoo ENSIN käsin kuratoidun listan `OMAT_GALLERIAT` ja vasta sitten
Wikipedian artikkelin kuvat. Victoria-järvi on tämän ainoa nykyinen
käyttäjä.

Vuoret saavat siis kuratoidut kuvansa samasta hanasta — oma
pakettitiedosto, ei 400 riviä lisää ui.js:ään.

## Työtapa

1. `tools/hae-vuorikuvat.mjs` kokoaa ehdokkaat Commonsin
   KATEGORIASTA (Wikidatan P373 kautta, ei nimihausta) — vain
   PD/CC-lisenssit ilman ND- ja NC-ehtoa, vähintään 1600 px leveä,
   vaakakuva, kartat ja kaaviot karsittuna. Commonsin omat laatuluokat
   (Quality/Featured/Valued) nostetaan jonon kärkeen.
2. `tools/tee-kuvataulu.py` latoo ehdokkaat yhdeksän ruudun tauluksi,
   ruutu 480 px — jokainen kuva KATSOTAAN silmällä ennen hyväksyntää.
   Työkalu ei valitse mitään.
3. Hyväksytyt kirjataan pakettiin lisenssirivin kanssa.

Kumpikaan työkalu ei tarvitse avaimia.

## Muistiinpanot Fablelle

*(täydentyy työn edetessä)*
