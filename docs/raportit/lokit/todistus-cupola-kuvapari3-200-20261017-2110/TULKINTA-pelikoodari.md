# Cupola sarja 3 (1,0 | 0,8 | 0,7), Pelikoodarin tulkinta 17.10. 21.2x

Käännös b8a49a09 (cupola-suoja-200 61c84b66a + suojaprofiili 492b38a91). TODISTUS OK, 6/6 kuvaa. Virherivit vain laattapalvelimen
Curl-aikakatkaisuja (kone kuormassa), ei poikkeuksia.

Täysikokoiset rajaukset (Kanaali–Lontoo–Rouen, kuva a):
- 1,0: maaston pikkupiirteet (joet, peltotilkut) terävimmät.
- 0,8: hieman pehmeämpi, ero 1,0:aan pieni; rantaviivat ja kuviot säilyvät.
- 0,7: selvästi pehmeämpi maastossa; kaupunkien nimet yhtä terävät kaikissa (UI-kerros), auringon hehku sama kaikissa.
- Kuvissa ISS liikkuu otosten välillä, joten rajaus ei ole pikselintarkka vertailu.

Kustannus: 0,8 piirtää 0,64 pikseliä vs 0,7:n 0,49 (≈ +30 % fragmenttityötä). Kierroksen 3 mittaus 0,7:llä 18–22 ms → 0,8:lla
arviolta 23–29 ms, edelleen alle 30 fps:n 33 ms rajan. Lämpöä 0,8:lla ei ole mitattu.

Suositus: 0,8 Cupolan suojaprofiiliin (näkyvä laatuero 0,7:ään, arvioitu kustannus mahtuu 30 fps:iin); varmistus yhdellä
5 min laitemittauksella M1-iPadilla ennen NS:n junaa. Jos mittaus ylittää 33 ms tai lämpö nousee, 0,7 (nykyinen 492b38a91).
