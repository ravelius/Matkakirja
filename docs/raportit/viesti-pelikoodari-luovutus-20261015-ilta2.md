# Pelikoodarin luovutus 15.10.2026 ilta 2 (PT:n pyyntö, klo 18.27)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, push remoteen
natiivi-backup peili/proto/<haara>). Edellinen luovutus viesti-pelikoodari-luovutus-20261015-ilta.md (kaikki sen kohdat hoidettu).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. Viestit `send_message` session id:llä (osoitekirja /Users/Shared/Claude/osoitekirja.md).
- OMISTAJA 09.36 "Ei testejä junaan" (PT 18.2x): EI simutodistuksia junan erille; L2-käännös vain kääntymisen tarkistuksena (Julkaisijalta).

## Valmiit tässä vuorossa (juna 195, kaikki PT kuitannut ja NS:llä)
1. Lentokone pienenä + raketin piste pois: pelikoodari/aloituskone-195 e36f3b880 (todistus proto-3d/lokit/todistus-aloituskone-195-20261015-1744).
2. e02:n tummat puut = Ateena v12 (Zeus silma_m 75–90): pelikoodari/ateena-v12 edb351a43 (Linssisepän v11 93c146524:n päällä), viety CDN:ään
   (_valmiit/opas-pallokierros-ateena-v12-vienti-20261015). HUOM: Linssiseppä teki päällekkäisen 08ac5caee:n (sama data, eri versio-teksti) –
   NS:lle ja LS:lle kerrottu: junaan VAIN edb351a43 (vastaa CDN:ää).
3. ISS-erä (omistajan TF 194 -palaute 17.52): pelikoodari/iss-195 ef62db63e, L2 KÄÄNNETTY 776058cf0 (18.20). Sisältö:
   - oma sijainti: haku radan reunalta 51,6° (OmaSijainti.RadanLeveys) ja kohdevalikon lennon perillä alus kotiin (AstronauttiLinssi.SiirraAlus
     pidaLento) – syy: asema saapui oikein 51° N 26° E, mutta kiisi 2 min:ssa 38° E:hen (Venäjä);
   - skanneri: varatiedot laudan kaupungeista (Iss.SkannerinVara, Sisalto.Kaupunki asukkaat + intro), maa pisteestä. Juurisyy: skannerin oma
     aineisto (143 kohdetta) ≠ Cupolan nimet, ~10 % sai tiedot. AVOIN SK/KS:lle: 27 Euroopan laudan kaupunkia skannerin aineistoon ja
     korkeuskartat; päätös, näytetäänkö keksitty esimerkkipinta, kun korkeuskarttaa ei ole (IssSkanneri.Lataa, PT/omistaja);
   - kertoja jatkaa loppuvalinnan (Ohjaa itse) jälkeen ja Cupolaan palatessa (KupolinSelostus.JaksoSallittu, KupoliAanet valittu/kaynnistetty);
   - valaan ääni kerran ruudulla näkyvästä hypystä, taso 0,35, roiske hiljaa (Valoseppä kuittasi; RakettiValas-konfliktin ratkaisu NS:llä);
   - v1-aika-v2 (Äänittäjä, ilman Nyt-nappia) kokonaan + ohjauspaneelin ohje;
   - testiapu: `astro kyyti tila` näyttää aluksen alapisteen, `ui linssi skanneri riika` laudan kaupungin.
   Skenaario valmiina, EI ajettu (ei testejä): proto-3d/tyokalut/pelikoodari-ajot/sk-iss-195.txt + ajo-iss-195.zsh.

## KESKEN
4. MIKÄ TÄMÄ ON? Pulun äänellä (omistaja 16.21): pelikoodari/mika-tama-on-195 79fe06d98 (pohja natiiviseppa/juna-195 e9fba547b), Linssit
   1870/1870, tarkista.sh 0. Nappi → napautustila ("Napauta rakennusta") → TehtavaKohteet-osuma esittelyn/Liiku-listan kohteeseen → PuluChat.
   VastaaAanella (esittely taustatietona, striimi Pulun ääneen) → ei osumaa: /opas/lahella 40 m → muuten "en tunne" (TTS kytkimen takana,
   kehittäjällä päällä; OpasSovitin.EnTunneTts, `opas mika entunne 1|0`). Testikomento `opas mika <x> <y>`. Tähtäin pois OpasValikosta
   (NUI:lle kerrottu). TEE: (a) Julkaisijan L2-käännöstarkistus 79fe06d98 → KÄÄNNETTY-rivi → haara NS:lle ja sha PT:lle; (b) SK vie
   lauseen äänisivun Tekstit-osastoon tunnuksella pulu-mika-en-tunne (pyydetty 18.2x) → omistajan hyväksynnän jälkeen Äänittäjän otto
   korvaa TTS:n (MikaTamaPulu.EnTunne → klippi). Muistio proto-3d/_tyo/pelikoodari/mika-tama-on-195/MUISTIO.md.
5. Linssiseppä tekee ISS-yötaivasta: PT pyysi auttamaan ISS-rajapinnoissa (viesti lähetetty, ei vielä kysymyksiä).

## Avoimet / seurattavat
- Proto-worktreet: wt/proto-pelikoodari-aloituskone-195, -iss-195, -ateena-v12, -mika-tama-on-195 (työn alla/junassa); -pallot-pelaajille-194,
  -pallo-aanet-193, -kultaiset-193b poistettavissa (`git worktree remove`, vain omat).
- Simu pelikoodari-iPad13 39644E75 sammutettu 17.54. Orpo `simctl recordVideo` pid 26437 (14.10.) yhä; ei kosketty.

## Aloitusviesti uudelle Pelikoodarille
"Olet Pelikoodari (Opus, high). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-pelikoodari-luovutus-20261015-ilta2.md
(haara pelikoodari-luovutus-20261014-paiva). Kärki: Mikä tämä on? -erän käännöstarkistus (pelikoodari/mika-tama-on-195 79fe06d98) → NS ja PT
(local_5df52e10-10e4-4b72-9554-0049db300dfe), sitten Linssisepän ISS-yötaivaan rajapinta-apu. Ei simutodistuksia junaan."
