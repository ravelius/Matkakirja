# PT:n luovutus 3.11.2026 klo 20.27 (konteksti 30 %, pehmeä raja)

Edellinen: viesti-fable-luovutus-20261103-1905.md. Keskustelu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-11-03-klo-1905-2026.md.
Tili sami.reivinen@vvi.fi, viikko 11 %. Taulu https://claude.ai/artifact/R6VQFTUNq629zSzah719Uy. Id:t osoitekirjasta.
Vahdit Monitorilla 30 min (codex-posti-vahti.sh, odottajat-vahti.py | grep ODOTTAA|TYHJÄKÄYNTI|TILA), uudelleen joka päättymisellä.

## Tehty
- Raamattu 2.204: uusi kartta KK:n suunnitteluvastuulle (omistaja 19.35), PR 6210 mainissa + loki.
- Junaan 218 (junalupa JU:lle): NUI animaatiot 6b891fd1d, NUI porras 200f73222 (keisarin noston VIKA), NUI e971e1992 (noston blur rajattu ruutuun),
  PK nimi 3c02f62fe ("Viimeisen keisarin karkumatka", OMISTAJAN PÄÄTÖS 19.02 KK:n vahvistamana), PK lahipuut-v16 2ca2f17b7 (pari 07 katsottu),
  NUI elävä kartta 20b21efee (simu OK ef37c2b84; pakettiin vasta kaatumistodistuksen jälkeen). Iso paketti nyt ea2d6912f (= 7ac89ff33 + e971e1992).
- Junaan 219 (PK:n saumat-v1-219): LAV tausta v117 → v118 (Yangxinmenin pääty) → keltakatot-v1 (tausta-v119, rakennukset-v122, c2-v37, avoimet-v56;
  PK kytki 5733b689d). Juna 218 käyttää tausta-v115.
- KAATUMINEN: alun hyppy (80ea01172) todistettu a92302399:ssä. Omistajan 16.59-polku: noston blur + kamera → +0,5 Gt/100 ms. Korjaus e971e1992,
  ea2d6912f "kortti auki → lähizoom" OK (huippu 3659 Mt, ei varoituksia). Keisarin nosto näkyy (7ac89ff33, 2972 Mt), KK tarkisti tekstin ja kuvat.
- Uusi kartta (KK:n suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261103-pariisi-ylaviisto-ja-osakirjasto.md): kulma 60° lukittu (KK),
  VS yv2 8167ec39f + harmaa mallikuva (Codexin mittaohje), KS tilasi A2 erä 1 (e6c244857, fbc13796b, Notre-Dame pois 69acfd068),
  NS osa C raivaus 2ca91576c (8e0660847:n päällä). Codexin kulmaohje k1: sävyt kirjastoon, "kulma ja mitat eivät kelpaa".

## AUKI (järjestys)
1. KAATUMISTODISTUS: JU:n sulkuajo ea2d6912f (kohdenosto → ✕/`ui sulje` → 10 s → lähizoom + muistivahti, lokit nui-lahizoom-20261103/iso-ea2d6912f-sulku/).
   OK → KK:lle "kaatuminen korjattu ja todistettu" (KK tietää: EI vielä) + JU liittää 20b21efee isoon pakettiin. VIKA → NUI + NS.
2. Uusi kartta: KS:n A2-toimitus → KS tarkistaa → PT → KK. Omistajan linjaukset KS:n ikkunassa 20.17 (oikaistaan/lukitaan, RAKENNUSPERIAATE.md),
   20.20 (nähtävyydet maksimiliioiteltuina), 20.2x (Codex piirtää nähtävyyden lähiympäristöineen, läpinäkyvä yläosa; NAHTAVYYSALUE.md) on välitetty KK:lle,
   ja KK päättää raivauksen ja nähtävyysalueen sovituksen. NS: raivaus yv2:n päälle, kertoimia ei hiota ennen KK:ta. VS: k6 JU:lla (yv2), pystysauma lon 2,351 auki.
   Omistajan koealuepari (18.41) vasta uudella menetelmällä: Codexin koko kartta | uusi koealue 3 zoomilla → PT → KK.
3. PK: palvelijat v2 8f87966d2 ei vielä pelikuvapari (palvelija ei näy, korjaus seuraavalle PK:lle); taso1b-kamera cb7fde673 L2:lla; KK pyysi keisarikuvat
   (☰-linkki, loppukortin linkki, LISÄÄ) JU:n vuorolla. Lahipuut: leijuvien puiden katoaminen selittämätön, PK seuraa.
4. LAV keltakatot: albedo B 15 vs tavoite 82 (liian kylläinen). Pari 07 + kattomediaani JU:lta, ja jos B jää alle, v2 kylläisyys alas.
5. KS:n taustaajot: tasankopoltto (57 %), esittelypaikat (Overpass 502/504).

## Opit
- Todistusskriptin napautus voi osua väärään kohtaan (himmennys ei sulje nostoa, sulku vain ✕:llä). Tarkista lokista sulkurivi ennen kuin uskot polkuun.
- Ennen junaohjetta tarkista, mihin junaan osa on aiemmin kuitattu (saumat olivat 219:ssä).
- Isolla iPadilla `devicectl … --console` antaa CoreDeviceError 10002, joten käytä mittaa-ilman-konsolia.zsh:ta.
