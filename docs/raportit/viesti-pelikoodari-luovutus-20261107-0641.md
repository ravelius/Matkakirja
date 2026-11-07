# Pelikoodari: luovutus 07.11.2026 klo 06.41

Korvaa kaikki aiemmat. Juoksupelin taso 1 ja opit: `git show 1b2a61007:docs/raportit/viesti-pelikoodari-luovutus-20261107-0519.md`. Lontoon työkalut: `git show ee5465047:docs/raportit/viesti-pelikoodari-luovutus-20261107-0326.md` kohta 5. **Työ nyt: JU:n iPad-ajo pallosta käynnissä tai jonossa, ks. kohta 6. Sen jälkeen jono tyhjä.**

## 1. Lontoo G: KK:N PÄÄTÖS OMISTAJAN VALTUUTUKSELLA 06.40
"Lontoo G e48424a75 kelpaa kokeena, ei junaan." KK kysyy aamulla omistajalta kohdat 2.1 ja 2.2. **Ei lisäyrityksiä yöllä.**
- **Proto:** `/Users/Shared/Claude/wt/proto-pelikoodari-lod-diag`, haara `pelikoodari/lontoo-kyltit`, kärki `e48424a75`, työnnetty `natiivi-backup`iin. Vanha `pelikoodari/lontoo-b` (`fdbf8a0ef`) jää ennalleen.
- **Pohja:** KS:n ajon 46 kärki `a4269054a` (`a80a81323` + NUI `3d92da39e`). Oma kainalopoikkeus pois, NUI:n `KartanPiste` tilalle.
- **Muutos:** `NostotKartalla.PariisiKylteilla` myös ehdolla `OhjelmaKohteet.LontooKoe`, uusi `OnKylttialueella`; St Paul'sin kyltti korvaa noston qidilla Q399961 (`LontooKyltit`). `Kylttikohde.MallinRuutu` ja `Peittaa` toimivat ilman `Maaritys`-mallia.
- **Ajot:** g1 `f57966d05` (Lontoossa NRE lähes joka ruudussa, Pariisi kunnossa), g2 `e48424a75` (NullReference 0, Exception 11, sama taso kuin ennen). Lokit `proto-3d/lokit/pelikoodari-lontoo-g2-e48424a75` ja `pelikoodari-pariisi-g1-f57966d05`. **Parit:** `proto-3d/lokit/pelikoodari-g2-parit/`.
- **Skenaariot:** `proto-3d/_tyo/pelikoodari/lontoo/gen-g2.py <sha>` tekee `sk-g2-lontoo.txt`:n ja `sk-g2-pariisi.txt`:n. Pariisin puolella palat v20 ja KS:n koepohjat.

## 2. Auki, aamulla KK:lta
1. **Kyltit väistyvät:** Big Ben ja Westminsterin palatsi ilman kylttiä joki-kuvissa. Loki `kyltti malli: Big Ben pois Westminsterin palatsi`, sama Westminster Bridgellä, Victoria Memorialilla, Royal Observatoryllä ja Queen's Housella. Syy: Lontoon malleilla `Peittaa` käyttää koko rajalaatikkoa, ei Pariisin korkeuskerroksia (`malli.Profiili`). Korjaus olisi profiili `lontooMallit`-riville tai oma väistösääntö; ei kokeiltu.
2. **St Paul's:** kartan nimi "St Paulin katedraali" kyltin vieressä `kirkko-keski`-kuvassa. Tarkistamatta, miksi qid ei korvaa sitä.
3. **Ei vika (KK):** "Kuumailmapallo £200" on pallon hintalappu, omistajan päätös 11.10. Miksi se näkyy ajokuvissa: selvittämättä, KK: ei aikaa siihen.

## 3. Ennallaan
- **Kartta (juoksupeli):** odottaa LAV:n lopullista juuren nimeä, `git show b19785a95:docs/raportit/viesti-pelikoodari-luovutus-20261107-0418.md` kohta 4.
- **Juoksupeli:** proto `pelikoodari/tarkastelu-219`, `3ed82d1fb`, ei junaan. `292afcef2`:n pari KK:n aamun koontiin. Kortin muunnelma junaan vain omistajan päätöksellä.

## 4. Opit
- Yhdistettäessä tarkista uudet kentän käytöt: NUI:n koodi luki `malli`-kenttää, joka on Lontoon `Kylttikohde`lla tyhjä. Kääntäjä ja 701 testiä eivät nähneet sitä, ajo näki. JU huomasi lokista, kuvassa näkyi vain kylttien puute.
- Hintalappu ja eunukki: tarkista päätökset ennen kuin nostat näkymän avoimeksi (`node tools/loki-hae.mjs`, koodin kommentit).
- Parikuvat kokosin `/opt/homebrew/opt/python@3.14/bin/python3`:lla; koosteskripti oli scratchpadissa eikä säily: 8 riviä PIL:ää, Pariisi vasemmalle, 8 px väli, Lontoo oikealle.

## 5. Lisäys 06.52: Pariisin lista kohta 10 (PT 06.4x, vain todennus, ei korjausta, ei junaan)
Mac-ajo `a4269054a`, skenaario `proto-3d/_tyo/pelikoodari/vapaa-1/sk-kohta10.txt`, kuvat `proto-3d/lokit/pelikoodari-kohta10-a4269054a`. Paketti käytössä, NullReference 0. Viety PT:lle.
- Tunnuslause näkyy. Bastilji ja Place des Vosges erillään levossa (korkeudet 0,02 ja 0,006; 0,003:n rivi sama kuin 0,006:n, kamera ei mennyt lähemmäs). Liikkeessä ei testattu. Liiku avautuu.
- **Pallo ei selvinnyt:** Mac ei todista laitteen kuvaa, ja `aja`-kuvat jäivät Pariisin seudulle (kaari 0,4 ja 1,2), joten kokonaista palloa ei ole kuvassa. Laitekysymys vaatii iPad-ajon; PT:n sana odottaa. Katsottu 4 täysikokoisena, 6 pieninä, 2 avaamatta (`k10-bastilji-02`, `k10-bastilji-003`).

## 6. AUKI: pallon iPad-ajo (PT 06.51, yksi yritys, ei korjausta, ei junaan)
PT: "tavoite kokonainen pallo kuvassa ja sen kuva oikein laitteella". Pyydetty JU:lta 06.5x: sha `a4269054a`, iso iPad lukolla, `proto-3d/_tyo/pelikoodari/vapaa-1/sk-pallo-ipad.txt`, kuvat `proto-3d/lokit/pelikoodari-pallo-ipad-a4269054a` (`pallo-ranska`, `pallo-eurooppa`, `pallo-koko`). JU kuittaa tähän sessioon; jos kuittausta ei tule, tarkista kansio ja kysy JU:lta.
**Kun kuvat tulevat:** katso kolmas ja kaksi muuta, vie `pallo-koko` KK:lle ja tulos rivinä seuraavalle PT:lle (edellinen nollautui; id osoitekirjassa). Jos ajo epäonnistui: ilmoita PT:lle ja KK:lle, ei uutta yritystä, jää aamuun.
Oppi: `komento aja lat lon kaari`: kaari on asteina (`KorkeusKaarelle`), siksi 0,4 ja 1,2 jäivät lähelle Pariisia. Koko pallo 150.
