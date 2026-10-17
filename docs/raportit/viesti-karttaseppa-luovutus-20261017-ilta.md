# Karttasepän luovutus 17.10.2026 klo 16.5x (Postivahti: kova raja 39 %)

Linjaukset: Raamattu + muisti `karttaseppa-tila-*`. VIESTIT aina `send_message` session id:llä tiedostosta
`/Users/Shared/Claude/osoitekirja.md`, PT:lle ≤ 3 riviä. Edellinen luovutus: `viesti-karttaseppa-luovutus-20261017-iltapaiva.md` (5ee8e65b9).

## Aloitusviesti uudelle sessiolle

> Olet Karttaseppä (Opus, high). Lue CLAUDE.md ja `git show <SHA>:docs/raportit/viesti-karttaseppa-luovutus-20261017-ilta.md`
> KOKONAAN (haara karttaseppa-tyo-20260922). Viestit send_messagella id:llä (osoitekirja.md), PT:lle ≤ 3 riviä. JATKA KOHDASTA 1.

Käännökset ja simut VAIN Julkaisijan jonon kautta (KÄÄNNÖSPYYNTÖ → KÄÄNNETTY → SIMU NYT → SIMU VAPAA). Simut T7-sarjassa:
`xcrun simctl --set "/Volumes/T7 4TB/Simulaattorit/Sarja" list devices booted`. Proto-worktree: /Users/Shared/Claude/wt/proto-karttaseppa-iss-reitti-198
haaralla **karttaseppa/kiina-paketti-200** (peili natiivi-backup `peili/proto/karttaseppa/kiina-paketti-200`). Käännöshaara
`karttaseppa/kiina-vaestopinta-199` siirretään samaan kärkeen (`git branch -f` + push peili `peili/proto/karttaseppa/…`, EI pelkkää haaranimeä
remoteen) vain, kun `ps -Ao command | grep "[p]roto-kaanna.sh karttaseppa/kiina-vaestopinta-199"` on tyhjä.

## 1. ENSIN (PT:n ENSIN-kohta): SUI 589 -KUVAPARI, SELKEÄ HISTORIAKARTTA → PT → KK → omistaja

**Omistaja 16.29 v8:sta: "Todella epäselvä" → EI junaan.** Päätös 16.33 (sanatarkasti): "Kuka hallitsi ja missä" – "Selkeä kartta: valtakunnat
omina väreinään nimineen ja rajan muutos pysäkiltä toiselle. Muu näkyy vain hetken, kun kertoja puhuu siitä." KK:n 16.29 kohdat 1–7 ovat
toimeksianto. Lisät 16.34: "Ja tee kamera tarpeeksi kaukaa ja kiinan nykyiset rajat selkeästi." 16.35: "Alkuperäinen Korkeusero kartalla
lisää myös sekavuutta" (pohjasta korkeuserot ja -värit pois; tasainen vaalea maa, meri, suuret joet ohuina). ENSIN VAIN kuvapari Sui 589
(nykyinen | selkeä); 19 pysäkkiä vasta omistajan hyväksynnän jälkeen.

**TILA 16.50:** KÄÄNNÖSPYYNTÖ JU:lla: `kiina-vaestopinta-199 = 3b18ac5c9` → `_tyo/karttaseppa/kiina-selkea-589-app`, sen jälkeen SIMU NYT ~4 min.
3b18ac5c9 = selkeä-tila ed6b2e046 + PK:n kiinteä kamera 482d9aff1 (31c2b5f89 + 2e6c1e5fc). Linssit-testit 2026/2026, tarkista.sh 0.

**Askeleet:**
1. Odota JU:n KÄÄNNETTY → tarkista `git merge-base --is-ancestor 3b18ac5c9 <käännös-sha>` → kirjoita kansioon `kaannos.out`
   rivi `KÄÄNNETTY 3b18ac5c9 karttaseppa/kiina-vaestopinta-199 (…)` (ajo.zsh lukee SHA:n siitä).
2. SIMU NYT → `zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kiina-selkea-589/odota.zsh > …/kiina-selkea-589/odota-1.out` (taustalle) →
   ajo-1.out; valmis → **SIMU VAPAA JU:lle**. Skenaario `sk-selkea-589.txt`: kertova kamera pois (`kiina kamera 0`), `kiina vuosi 589`,
   QA-kamera `kiina vaestopinta kamera <km> <kallistus> <lat> <lon>`: S1 nykyinen 8500 km/0°, S2 selkeä sama kamera, S3 selkeä 10 000 km,
   S4 selkeä 7000 km/6°. (PK:n 482d9aff1 tekee laajan kuvan itse oletuksena; QA-kamera on vain vertailun takia.)
3. Kuvat todistuskansiosta `/Users/Shared/Claude/proto-3d/lokit/todistus-kiina-selkea-589-*/kuvat/`; tee pari ffmpeg hstack S1|S2
   (malli scratchissa: `ffmpeg -i S1.png -i S2.png -filter_complex hstack pari.jpg`). **Katso ITSE**: pohja tasainen ja vaalea (ei kohokuvaa),
   meri erottuu, joet ohuina, SUI / ITÄTURKIT / LÄNSITURKIT isoina, Daxing + Ötüken nimineen, punainen nykyraja paksuna vaalealla reunuksella
   ja "Nykyinen Kiina", koko Kiina naapureineen kuvassa. Korjaa ennen PT:tä, jos jokin puuttuu.
4. PT:lle 3 riviä: polku pariin + S3/S4. Kerro, että tekstilaatikko (pieni, vaalea) kuuluu NUI:lle.

**Selkeä-tila (QA `kiina selkea 0|1`, `KiinaKerros.Selkea`):** paperipohja = meri 1° hila #dde6e7 + maa 0,25° hilan ajoina #f2ecdc
(Resources/Kiina/selkea-pohja.json, `tyokalut/kiina_selkea_pohja.py`: Natural Earth 50m joet PD + maapolygonit.geojson ämpäristä),
rantaviiva ja joet Kynaviivana (jono 3000), maaston liioittelu 1 (`KorkeusKerroin`, palautuu 2:een OnDestroy/selkeä pois); valtiot 0,82
ilman kotiseutujen viivoitusta; Isoisä-nimet 2× tummina (`IsoisaKerros.KokoKerroin/Tumma`); väestöpinta, valopisteet, Karttasepän
kerrokset, pääkaupunkien jälki ja sinetti pois; nykyraja 2,8 + reunus, nimiö 1,6× pysyy. "Muu hetken kun kertoja puhuu" (kanava, reitti,
taistelu, keksintö, väestö) EI vielä tehty: ajoita vasta hyväksynnän jälkeen Williamin segmenttiajoista (KiinaKertoja.Ajat).

## 2. Valmiit tällä vuorolla (kaikki kiina-paketti-200:ssa, ei junassa)

| Erä | SHA |
|---|---|
| Matala pehmeä väestöpinta (omistaja 14.46) | 2d7975ae7 |
| Nykyinen Kiina punaisena katkoviivana + 3,5 s yksin alussa (14.52) | 5295c2064, 3b56185a6, aafdeed57 (jumiruutu, NUI:n diagnoosi) |
| Armeijat pehmeinä kumpuina, kamera väistää | 3b56185a6, 483c6bb87 |
| Väestöpinnan reuna häivytetty | 15ad035ad |
| v7 (15.26) ja v8 (16.01) koko linssin videot; v8 omistajalle 16.2x → "Todella epäselvä" | todistus-kiina-koko-linssi-20261017-1601 |
| Selkeä historiakartta + tasainen pohja + selkeä nykyraja | fef7561ac, ed6b2e046 |

## Muistiinpanot

- Kiina 19 pysäkin kesto v8: ~5:50 Käynnistä-napista (Williamin repliikit 4:48).
- NUI: Käynnistä-ruutu väistyy kyllä Kaynnistetty-tapahtumasta; Kaynnista-kutsun jälkeinen 3,1 s jumi söi rajahetken (korjattu aafdeed57).
- `ValotPois` tyhjentää nyt listat (selkeä-tila kesken linssin).
- Paikallinen `.claude/settings.local.json` on muutettu (ei omani, ei commitoida).
