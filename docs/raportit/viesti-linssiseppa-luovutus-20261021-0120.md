# Linssisepän luovutus 21.10.2026 klo 01.20 (yöjono: lentävä kamera kärjessä)

Edellinen: viesti-linssiseppa-luovutus-20261021-0035.md. PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, NS local_a9af6995-1787-4508-8b86-964f59a11392,
JU local_f1add29f-e834-48da-a22a-0459dbc49994, Lavastaja local_c958bb12-f3e5-431f-a767-874471ee2889, Äänittäjä local_f8fe7e20-4700-42e5-91a0-f1227310dc0f.
Viestit send_message-varakanavalla (SendMessage-raja täynnä).

## 0. AVOINNA
1. **LENTÄVÄ KAMERA** (omistaja 21.10. 00.40, PT: yöjonon kärki): proto `linssiseppa/museo-lento-209` kärki **d6c28c31e** (pohja amsterdam-louvre-209
   0f7b520c5), worktree /Users/Shared/Claude/wt/proto-linssiseppa-museo-lento. Testit vihreät (museo 228/228, Lentokaari 5/5, tarkista.sh 0). EI vielä NS:lle:
   odottaa Louvre-videota (PT → KK → omistaja hyväksyy; muut museot hyväksynnän jälkeen).
   - JU:lle KÄÄNNÖS + SIMU -pyyntö 01.1x: app _tyo/linssiseppa/museo-lento-209-app, ajo-skriptit proto-3d/tyokalut/linssiseppa-ajot/ajo-lento209-{iphone,ipad}.zsh
     (liput simu-lento209-*.nyt), skenaariot sk-lento209-*.txt (iPhone pysty, iPad vaaka; "museo tallenna louvre-lento 75 30" → ruudut todistuskansioon).
     Ruuduista video: ffmpeg ruudut.csv:n tahdissa (kuten monalisa-video-207) → _valmiit/louvre-lento-209-<pvm>/ → PT.
   - Rakenne: Kamera/Lentokaari.cs (yksi kaari: Liikepohja.Kaari, kesto 1,5·√matka, ≤ 5 m/s, ≤ 2,5 m/s², mutkissa hidastus, taivutus seinästä,
     kallistus kokeiluna ≤ 2,5°) + Museo/MuseoKierros.Lento.cs (Lento-lippu, QA "museo lento 0|1|kallistus 0|1|tila", vaihtoehtoiset kaaret ovista
     ruudukkoon, SallittuLento: vara 0,2 m, korkeat esteet, jalustat, henkilöt 0,8 m; ketju, tauko perille). Vanhat musta/kävely-testit IlmanLentoa-lohkossa.
   - Avoimet: pitkät salista toiseen lennot 25–28 s (Mona Lisa → Salon Carré 42 m) – arvioi videosta (MutkaKiihtyvyys, LentoOviM, VauhtiMax).
     Katse ei seuraa kulkusuuntaa ovien läpi (sääntö: kaikki akselit samalla käyrällä) – arvioi videosta, osuuko katse seinään oviaukossa.
   - Lavastaja: kävijäpaikat (k2 iPadin kaarella, MuseoLentoTestit.HenkiloPuutteet).
2. **Amsterdam Louvre-tasolle + askeleet v7 + sali-v7**: `linssiseppa/amsterdam-louvre-209` kärki 0f7b520c5 NS:llä junaan 209 (rebasattu 48f7dc22f:n päälle).
   Worktree proto-linssiseppa-amsterdam-209 → poista kun junassa.
3. **Kulmakoristeet**: Codexin PT733 aamulla.
4. **Löydös**: MuseoTaukoKameraTestit.PysahdysRajaaKaikkiPaikat kaatuu yksin ajettuna (myös pohjahaarassa), menee läpi Museo-sarjassa – tilariippuvuus, ei korjattu.

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus. Tarkista JU:n vastaus (käännös ja simu lento209), tee video ja lähetä PT:lle.
Sitten Lavastajan k2-siirto ja NS:n 209-tilanne.
