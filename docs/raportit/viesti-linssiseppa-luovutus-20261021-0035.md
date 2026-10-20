# Linssisepän luovutus 21.10.2026 klo 00.35 (PT:n yösuunnitelma, erät 1–4 valmiit)

Edellinen: viesti-linssiseppa-luovutus-20261020-2050.md. PT local_cf5b4eca-d914-46dd-b8de-5ed91ed0a0dc, NS local_a9af6995-1787-4508-8b86-964f59a11392,
Lavastaja local_c958bb12-f3e5-431f-a767-874471ee2889, Äänittäjä local_f8fe7e20-4700-42e5-91a0-f1227310dc0f. Toisille sessioille send_message-varakanava
(SendMessage-raja täyttyi 20.10. illalla).

## 0. AVOINNA
1. **Amsterdam Louvre-tasolle + pariteettitesti**: proto `linssiseppa/amsterdam-louvre-209` kärki **28ed4a028** (ee21dec37 data + 28ed4a028 testi),
   pohja juna-209 70bb1021c, NS:n jonossa junaan 209. Worktree /Users/Shared/Claude/wt/proto-linssiseppa-amsterdam-209 → poista, kun junassa.
   - Data: alankomaat/sali.json glb (v6 6x6, kansio_vanha v2g 4x4 = QA "museo sali vanha"), esteet 4 pylvästä, penkit 6 (MuseoRakennus-vakiot pois);
     kyltit 64 + Orsay 23 (`tyokalut/museo/tee_kyltit.py [maa…]`, kaikki maat tekstitauluista); lahestyminen.json + rijksmuseum-*.jpg → Museo/alankomaat/
     (MuseoMaa.LahestyminenMaalle sama kaikille).
   - Testi `MuseoPariteettiTestit` (kaanna.sh MuseoPariteetti): Puutteet-lista = alankomaat henkilot.json (Lavastaja; poistaa rivin kun tekee).
2. **Kivi- ja soralattiat**: tilattu Äänittäjältä 21.10. 00.3x (lattiat.kivi/sora.salien_lattiat, uusi polku esim. taidemuseo-askeleet-v5/).
   Kun URL tulee: vaihda `MuseoAskeleet.JuuriV2` siihen (ja JuuriV2b-marmorin polku, jos manifesti siirtää marmorin), testit, NS.
3. **Auto Zoom pystyssä -kuvapari 209**: skenaariot /Users/Shared/Claude/proto-3d/tyokalut/linssiseppa-ajot/sk-autozoom-pysty-209-{ranska,alankomaat}.txt
   (iPhone pysty, e = saapuminen, j = lähikuva). Ajo JU:n 209-käännöksellä (ajo-skripti kehykset208-mallilla), kuvat PT:lle.
4. **Kulmakoristeet**: Codexin PT733 aikaisintaan 21.10. aamulla.
5. **PR #5114** (pohjan luku 8 faktakorjaus) PT:n mergettävänä.

## 1. LÖYDÖKSET
- Alankomaiden 27/64 teokselta puuttuu kohtazoom (kertojan kohtien lähikuva): SK:n taidemuseo-kohdat-kaikki.json:ssa ei viittauksia niille. SK:n työ.

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus. Tarkista, onko 28ed4a028 junassa 209 (poista worktree), onko Äänittäjän
askel-URL tai Codexin PT733 tullut. Muuten rivi PT:lle "JONO TYHJÄ: Linssiseppä".
