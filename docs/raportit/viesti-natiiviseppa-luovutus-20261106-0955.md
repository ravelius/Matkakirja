# Natiivisepän luovutus 6.11.2026 klo 09.55 (konteksti 26 %, pehmeä raja, 7.37)

Korvaa -0940:n SEURAAVA TYÖ -kohdat 1 ja 4. -0940:n kohdat 2, 3 ja 5 sekä viestit ja työtapa pätevät sellaisina (haara natiiviseppa-luovutus-0940, 968495853). Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja. Luo ensin cron "4 9 * * *" uudelleen (Raamattu 7.41, proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py).

## Tehty tässä sessiossa
- Unity b8 on rungossa: julkaisija/runko-219-muisti = addae63f2 (JU 09.47; 7bbf04e09 + vain ProjectVersion, diff tarkistettu). Tulos ja tiedotteen muutokset KK:lla ja PT:llä; "kuvat ok" annettu JU:lle. Kuvasarja b7 | b8: lokit/natiiviseppa-b8-vertailu-b7-7bbf04e09 ja -b8-addae63f2. Mac-editori, ei simulaattori- eikä iPad-ajoa, muisti mittaamatta.
- Tarkistus b8-kirjastoilla: JU vahvisti (b8-jatko.log), exit 0, 0 virhettä, kameratestit 54/54 ja 3/3. Muita testejä ei ajettu.
- Rooleille ohje "yhdistä runko, kun jatkat; b7- ja b8-kuvia ei verrata ilman merkintää" lähetetty 09.48 (NUI, PK, VS, KS, LAV). PT:n järjestysviesti tuli sen jälkeen ja saattoi tarkoittaa testisarjan jälkeen; PT:lle kerrottu, vastausta ei vielä ollut.
- Diagnostiikka: paikallinen haara natiiviseppa/unity-diagnostiikka-pois, 811774092 (m_EngineDiagnosticsEnabled 0, submitAnalytics 0) + d901606d3 (Rakennus.cs DiagnostiikkaPois ennen BuildPlayeria: EngineDiagnosticsSettings.enabled = false, luku lokiin, keskeytys, jos päällä). Ennen b8:aa ohitetaan kokonaan. Tarkistettu erillisenä testinä 6.3.24f1:n, b7:n ja b8:n kirjastoilla, versiologiikka ajettu; koko Rakennus.cs:ää ei käännetty. Sha PT:llä. Ei junaan, ei omaa ajoa. _tyo/natiiviseppa/unity-b8/vaihtolista.md kohta 6.

## SEURAAVA TYÖ
1. JU:n koko testisarja b8-rungolla on jonossa L2:lla, tulos tulee NS:lle. Katso tulos; virheistä rivi PT:lle.
2. PT: seuraavasta b8-ajosta katso, toistuvatko Licensing-kättelyvirhe (1 vain b8:ssa) ja miniatyyrit "ei latautunut" (b7 177 | b8 210; koko haku grep "ui kuva ei latautunut" unity.log). Määrän erolle ei ole syytä. Rivi PT:lle.
3. Diagnostiikan todennus (PT): vasta ensimmäisellä b8-laitekäännöksellä ennen seuraavaa TF:ää, samalla b8-laitekopiolla kuin iPad-muistimittaus. Lokirivi, iOS-profiilin arvo (Library/BuildProfiles/PlatformProfile.ad48d16a..., m_BuildTarget 9, nyt 2), ratkaisevasti liikenne ennen ja jälkeen rvictl + tcpdump. /dev/bpf vain rootille: sudorivi KK:n kautta vasta silloin, EI pyyntöä nyt. Varmistamatta: onko aktiivinen profiili BuildPlayerin hetkellä iOS:n. Haara yhdistetään vasta, kun PT niin sanoo. Älä sano "ei dataa" ilman mittausta.
4. Louvre: kun KS:n ajo tulee, katso Louvren itä- ja pohjoispuoli matalalta ja tulos KK:lle (-0940 kohta 2).
5. Ennen junaa (-0940 kohta 5): TaloKerros ja OhjelmaKohteet valovahdin yli; ei tehty, PT ei pyytänyt vielä.

PiiloVartijaan ei muutoksia (PT). KK 09.4x: tulokset PT:lle, ei KK:lle, paitsi Pariisin kuvat ja se, mitä KK tai PT erikseen pyytää. Ei junaan, ei iPadia.

## Opit
- b7 | b7 -kohinaa ei ole mitattu: älä väitä pikselieroa b8:n vaikutukseksi. Kuvissa erot olivat yksittäisissä nimissä (Faubourg Saint-Marcel, PARIISI), ei kaikissa teksteissä.
- Tuontijälki (URP GlobalSettings, PackageManager.policy) on sama blob b93aea9f9 myös esikatselu-kopiossa, jonka vaihtolista merkitsee b7:ksi; ei commitoitu.
- SendMessage pysähtyi 10 viestin rajaan: käytä mcp__ccd_session_mgmt__send_message (CLAUDE.md, VIESTIRAJA).
