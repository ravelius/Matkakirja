# Siirtosepän luovutus 11.10.2026 yö (Opus 5.5, high; konteksti 51 %, PT:n nollaus)

## ALOITUSVIESTI SEURAAJALLE

Olet Siirtoseppä (Opus, high): Olavinlinnan historiamoottori ja pelattava pala (natiivi proto). Lue tämä, CLAUDE.md ja Raamatun
Ydinajatus kohta 2 sekä PT:n yösuunnitelma /Users/Shared/Claude/Matkakirja-fable/scratchpad/olavinlinna-yosuunnitelma-20261011.md
(sinun osasi A1–A7 järjestyksessä + B1 LR:n kanssa) ja Laitetestaajan raportti
/Users/Shared/Claude/Matkakirja-laitetestaaja/docs/raportit/laitetestaaja-olavinlinna-ensikerta-20261011.md.
Proto-worktree /Users/Shared/Claude/wt/proto-siirtoseppa-kello (haara siirtoseppa/botti-kavely 9c59fcf3b on yön kärki, kaikki alla
olevat sen sisällä). Simu 8362879F = siirtoseppa-iPad13 (T7). Käännös- ja simuvuorot Julkaisijalta (KÄÄNNÖS NYT / SIMULAATTORI NYT);
ilmoita "lukko vapaa" / "SIMU VAPAA". ÄLÄ pysäytä odottavaa käännöstehtävää TaskStopilla lukemata lukon kuka-tiedostoa (11.10. 00.37
lukko jäi roikkumaan). Käännös: `PROTO_APP_KOPIO=… zsh proto-3d/tyokalut/proto-kaanna.sh siirtoseppa/v47d+siirtoseppa/botti-kavely+siirtoseppa/kavely-monimesh`
(perl setsid). Todistusajo: wt/proto-natiiviseppa-tyokalut/tyokalut/todistusajo/todistusajo.sh --nyt --era … --laite ipad.

## TILA (kaikki junaan 181, ellei toisin)

| Haara | Kärki | Tila |
|---|---|---|
| siirtoseppa/v47d | b51f3aefb | KUITATTU 180 (laiturin vedenalaiset kolmiot, LR v47d) |
| siirtoseppa/lapipeluu-vahdit | 25fe0ce70 | KUITATTU 180 (Kuuntele-nappi piiloon, pankin suorat klipit äänivahtiin) |
| siirtoseppa/tyrma-kiire | 2e77de4ce | ⊂ botti-kavely: dioraaman syöte pois pelissä (Keittiö-kyltti + leikkausikkuna), katse ovelle/avaimiin, "Tyrmä"-nimi kerran, minikartta (levossa oleva vasen tappi) pois |
| siirtoseppa/botti-kavely | 9c59fcf3b | YÖN KÄRKI: + botin reittisyy-loki ja tauko pisteissä, liike lukossa 2,5 s tyrmän herätyksessä, lattiaesineet valitsimeen vaakasuunnasta. TYRMÄ-PAKO OK simulla 2f23c9db7 (ulos 41 s avaimilla, video todistus-tyrma-pako-20261011-0110). PT:lle ilmoitettu |
| siirtoseppa/v47e | f1c029b27 | EI kuitattu (rantakivet v2 paljasti natiivin vesilaatan, porttiaukon jyrkänne) |
| siirtoseppa/v47f | 09c6d28eb | Linssit OK, KUVAPARI LR:LLE OTTAMATTA (laituri + portti samoista kulmista kuin v47e: skenaario olavinlinna-v47f.txt = kuvapari + huonekuvat tarkistuspisteistä) |

## SEURAAVAT (PT:n yösuunnitelma A1–A7)

- A1 laiturin kiinniotto ensin: 60 s turvassa, varoitus ennen kiinniottoa ≥ 2 s. Lisää `SeikkailuVartijat.VaroitusAlkoi` (public static
  event Action<Vector3>, vartijan paikka) — Pelikoodari kytkee siihen äänen (lupasin nimen). Riita()-korutiinin äänirivit ovat Pelikoodarin.
- A2 liike lattiassa ja kamera ei seinän sisällä (botin kuvissa b014, b044, b055, b059 lähes mustia = todennäköisesti kamera seinässä).
- A3 tyrmän muunnelmat 2 (vesipoika) ja 3 (irtokivi) loppuun ja 60 s:n Pulu-avaus oikeasti (muunnelma 1 todennettu). Skenaario tyrma-pako.txt
  (kerta % 3: uudelleenkäynnistys → muunnelma 1; toinen kiinnijäänti samassa ajossa → 2).
- A4 vihjeet ruudulle (nyt vain lokissa "vihje 2 … (Liekki)").
- A5 laiturin/veneen ylle leijuvat huoneiden nimet pois (tyrma-kiire hoiti napautuksen kohdistuksen; tarkista nimilaput PaivitaLaput yleisnäkymässä pelin aikana).
- A6 tehty (minikartta), mainitse kuvaparissa.
- A7 tehty: botti-kavely.txt (94 pistettä, tauko 2,5 s, kuva joka pisteessä, video). Tulos todistus-botti-kavely-20261011-0052: 67/94 kävellen,
  VIRHE-syyt lokissa (kappelin kävely "ei NavMesh-reittiä" = jumi, siirto). Kirkkaus: proto-3d/tyokalut/siirtoseppa-ajot/kirkkaus.py
  <kansio> [raja 28] → 32/94 alle rajan (portaat 14/43/44, palatsi 55/59/63, muurikäytävä 83, kappelin kävely). B1: mustat pinnat LR:lle kuvin.
- NUI tekee B2 (kynttilän ToimintoNapista-lippu SeikkailuEsineissä botti-kavelyn päälle). Pelikoodari B3 äänet (haara pelikoodari/olavinlinna-aanet botti-kavelyn päällä).

## OPITTUA

- Kosketuskoordinaatit pystysimussa: tap/veto x = 1032 − y_vaaka, y = x_vaaka (todistusraportti.py etsi). tap-teksti Pelaa oli epävakaa → `tap 482 626`.
- Tyrmä alkaa usein kesken vasemman vedon: oleta-rivi jää ohi (VIIM nollautuu jokaisessa vedossa) → skenaariossa vedot ja sitten odota.
- Napautus pelissä meni myös DioraamaSyötteelle (Kohdista huoneeseen) → kyltit ja kuoren leikkausikkuna; nyt syöte vain ilman pelaajaa/venettä.
- Laiturin "sininen möykky" = ympäristön rantakivet.glb hämäräkuvalla (ei v47d:n vika); v47e:n kapea jalusta paljasti natiivin vesilaatan suoran reunan.
