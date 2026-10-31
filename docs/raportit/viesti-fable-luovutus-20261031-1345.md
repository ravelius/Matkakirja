# PT:n luovutus 31.10.2026 klo 13.45

Edellinen: viesti-fable-luovutus-20261031-1130.md. Viestit aina id:llä (mcp__ccd_session_mgmt__send_message). Osoitteet: /Users/Shared/Claude/osoitekirja.md.

## OMISTAJAN VOIMASSA OLEVAT PÄÄTÖKSET TÄLTÄ VUOROLTA
- **13.27 OMISTAJA PYYSI JULKAISUA:** "Julkaise juna kun kaikki kartta työt tehty" (+ 30.10. 22.27: vasta kun valo valmis).
  Juna 216 (TF + web) lukitaan PT:n merkistä JU:lle, kun alla oleva KARTTALISTA on valmis ja valo hyväksytty.
- **13.33:** EI AIKA-ARVIOITA omistajalle, KK:lle välitettäväksi eikä Asemataulun omistajan teksteihin (Raamattu 7.31, PR 5715).
- 12.49: 43 kadonnutta ihmettä hyväksytty (lista scratchpad/paatoimittaja/kadonneet-ihmeet-karsittu-20261031.md, loki PR 5713);
  Mustapäiden talo + Vilnan alalinna tavallisiksi (PR 5716 mergetty, JU vie).
- 12.4x: piirrosten uusi pienempi koko kaikkiin kaupunkeihin (koko näkyvän osan mukaan, yksi lähde js/packs/kohdekartan-piirroskoot.js).
- 11.43: Sibeliuksen puisto (piirros ilman Hiltusen veistosta; monumentti ja Finlandia tekstissä), PR 5712.
- 11.31: kierroksen pysähdyksessä kamera kallistuu koko rakennuksen näkyviin (NUI kierros-vaaka-216).

## KARTTALISTA (juna 216 lähtee, kun kaikki valmiina)
1. **43 ihmettä (KS):** kaikki 4 tekstierää PT:n hyväksymiä korjauksin (proto-3d/_tyo/karttaseppa/ihmeet-era{1..4}-tekstit.md);
   86 Codex-kuvaa (kartan piirros + loistoaikakuva) tilattu (posti 6ccb39ecd, 059e91631). KS kytkee data-PR:t vasta kun kuvat ämpärissä → JU vie.
   Linjaukset: kaikki rajatapaukset kadonnut: true; toistokuvio "pitää työpaikkana eikä ihmeenä" enintään 1/erä; tekijöitä (natsit) ei nosteta korostuksiin.
   Greenwich ja Pyhien apostolien kirkko kohdekartan ulkopuolella → kainalo.
2. **PR 5708 (KS):** 118 kaupungin ajo käynnissä (uudelleenyritys verkkokatkon jälkeen) → JU vienti. Sis. Thamesin vuorovesi → Millennium Bridgen portaat,
   Hobrechtin putket → Radialsystem V (tarkista, sopiiko piirros uuteen nimeen).
3. **PR 5712 Sibeliuksen puisto (KS):** odottaa Codexin piirrosta; vie vasta piirroksen kanssa.
4. **NUI natiivin piirroskoot:** junassa e854881a4 + korjaus 24426a0a0; arvot KS:n koot-tiedostosta → tarkista natiivissa, kun 5708 valmis.
5. PR 5690 Metroasema MERGED, PR 5716 MERGED (JU vie).

## Muu juna 216
- Runko **65aa73362** (NS, vihreä): + kori 0,8 (VS d63d3dcc4), kohdekartan piirrokset (NUI e3238b20f), piirroskoot, pk8-polku (PK 0df9eb01f).
- pk8 mediassa (JU 12.39, 200, tiiviste e8a5b2327aa7); pk7 jää 404 (TF 214/215 sokkelossa).
- **NUI kierroserä** kierros-vaaka-216 d7103b074: KK palautti 4 korjausta (kamera rajaa rakennuksen tekstityksen yläpuolelle, kuvat oikeammalle,
  museon siirtotila todisteeseen, uusi video ilman kuormaa) → KK → omistaja → NS.
- **Valo (julkaisun ehto):** LAV leivonta-v1 _valmiit/juoksupeli-kk-lavastaja-leivonta-v1-vienti-20261031 (SHA256SUMS 6c040967e35a);
  PK:n k3-koe ylivalottaa (proto-3d/_tyo/pelikoodari/leivonta-217/parit-k4/) → VS tekee sovitetun parin pienemmällä kertoimella → KK.
  LAV osasarja-v6 jatkoajo käynnissä → sitten kujan 0-3 uusinta pienenä pakettina; VS korjaa tarkistimen reunasäännön (kuja-1-3).
  Lopuksi kortti omistajalle: valo oletukseksi?
- PK nollattu (luovutus PR 5714), odottaa v6-atlaksia ja kerroinpäätöstä.

## Levy ja tili
- Käynnistyslevy 101 Gi (Postivahti siivosi kk-cdp-* -profiilit; KS:n skriptit siivoavat nyt itse). proto-3d 96 Gt omistajan päätettävä.
- Viikko ~75 % klo 11.3x; 92 %:n raja (Raamattu 12.21).

## Säännöt, jotka opin
- Tekstierien tarkistus: lue faktaristiriidat ensin; poista epävarmat ja irralliset (trivia, tarinat), pidä tuhot neutraaleina, ei tekijän nostoa.
- Media-vienti uuteen polkuun (pk8) ei muuta julkaistuja TF:iä; vanhan polun palautus kaataisi ne.
