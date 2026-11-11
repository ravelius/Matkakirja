# Sisältökirjuri: luovutus 11.11.2026 (konteksti 31 %)

Haara koti/Matkakirja-sisaltokirjuri, kaikki commitattu ja pushattu; mainista mergattu 11.11. (haara muuten ajan tasalla). Edellinen luovutus: `git show e043791ab:docs/raportit/viesti-sisaltokirjuri-luovutus-20261111-2130.md`. KK:n päätökset: Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-introvuodet-era1-paatokset.md ja -kuvatekstikorjaukset-paatokset.md.

## Valmis tässä sessiossa
- Pulun p1 Ballon Generali (a4be3cdd9); Pariisin isoisän ääni dataan, reaktiot [] (7d4896367; ääni = https://media.matkakirja.app/aanet/kaupunki-intro-v3/isoisa-pariisi.mp3; luennat-kokoelman url syntyy aanite-kentästä, tools/vienti/kokoelmat.mjs).
- Introrivit: erä 1 (93) ja erä 2 (103) kaikki valmis, KK:n päätökset sovellettu, 11 katsomatonta katsottu mediasta (ffd9b02db, 1b002ca4b). Dublin #3 "· 1220–1260".
- Kuvatekstit: 66 korjausta koodissa (1bcd7e301; js/packs/kulttuuri-kategoriat.js, fokusvirta-krakova.js kommentti); raportit docs/raportit/kuvatekstikorjaukset-ehdotus-20261111.{md,json} ja -toteutus-20261111.md. PT ja KK tietävät; PT vie junaan.
- Työkalu: koodimuutokset tein skriptillä (parsi `lyhyt:`/`selite:`-literalit, vaihda uniikilla vanhalla tekstillä); skripti scratchpadissa, ei repossa — jos tarvitaan uudelleen, kirjoita uusi (30 riviä).

## Seuraavaksi
1. ERÄ 3 (KK 21.13: "samoilla säännöillä, minulle vain poikkeukset"): seuraavat kaupungit saapumisintron riveille ja kuvateksteille. Menetelmä kuten erät 1–2: Sonnet-agentit (2 kaupunkia per agentti, ei Fablea agenttina), lähteet 2 per vuosi, kuvat KATSOTAAN mediasta (kuvat: https://media.matkakirja.app/ + peiliKuvaPolku(tiedosto,'kuvat') → julisteUrl(ampari) heroille/intro-pngille; sips -Z 1000), säännöt 1–12 (KK:n päätöstiedosto). Kaupunkilista: kysy KK:lta/PT:ltä, mitkä kaupungit; vahvista avauskuvat-listat KULTTUURI_KATEGORIAT[kaupunki] (dump-skripti: tulosta avauskuvat lyhyt/selite).
2. Tukholma #4 ja #6 ilman `lyhyt`-kenttää (ei virhe tässä erässä, mainitse KK:lle jos halutaan lisätä).
3. Heikosti lähteistetyt jätettiin ennalleen (Tukholma #7, #8, Edinburgh #10, Budapest #7, Rooma #6, Istanbul #2); ei muutoksia ilman KK:n pyyntöä.
