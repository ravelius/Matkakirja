# Pelikoodari: luovutus 29.10.2026 klo 08.13

Seuraava Pelikoodari jatkaa tästä. Muisti: pelikoodari-tila-20261018-aamu.md (UUSIN). Edellinen luovutus -20261029-0736 (PR 5542).

## Valmista
- KUJAN 40b RASTERI KORJATTU (proto pelikoodari/pk7-214 15c967f26): muurikujan pakotettu reitti avasi rasteriin janan rajaavan
  akselinsuuntaisen laatikon. Kujan 40b janan 2,4 m:n vinous (kierretyssä kehyksessä) teki siitä 5,8 m leveän 4,5 m:n kujaan, ja
  molemmat muurit katosivat; keskilinjahaun sarake kulki itämuurin päällä. Nyt kaista avataan symmetrisesti pakotetun linjan ruudun
  ympäriltä. Ensimmäinen yritys (kaista vinon janan suuntaisena) hävitti kujan 05 pohjoisverkon (sarake ei mahtunut), toinen
  (keskiarvo ilman ruudun keskitystä) teki juhlasalin viereen 0,5 m:n rinnakkaissarakkeen (ProfiiliHypyt-testi kaatui).
- v64-KANSIOT (cd7cbbdcb): tausta-v64, rakennukset-v49, muurikate-v20, avoimet-v51, esto v13 (palatsi-esto-v13/esto.bin SHA 93399879…,
  _tyo/pelikoodari/kuja05-pk6-20261029/). Ratatarkistus pk7 + v64 + esto v13 (tulos-pk7-v64-korjaus.txt): pääkaista kujan 40b keskellä
  (itämuurista 1,2 m), botti portilta kujan 05 läpi 8/8 siementä ilman kompastuksia ja kiinniottoa, kujalla 0 estettä. Peli 761/761,
  tarkista 0. Tason 1 reitti ennallaan (T:n ohje siirtyy 0,6 m). PT:lle OK 08.0x → nippu JU:lle PT:n kuittauksella (JU vie v64-kansiot,
  kk-pohja-v1d-pk7 ja esto v13 ämpäriin).
- DRONE d (proto pelikoodari/drone-214 8e36fbac5): c:n jälkeen portilla oli yhä 16 m/s, koska nosto tuli räystäshaarasta (katon alla
  kamera räystään yllä, räystäs 3,3 → 11,9 m). Nyt Puyin tulevien paikkojen (4 s) räystäät aloittavat nousun ajoissa, nousu ja lasku
  enintään 2,5 m/s (JuoksuSokkeloMaailma.RaystasKohdassa). Lokin kameraväli-riville tuli rnosto. Peli 762/762, unity 0 virhettä,
  tarkista 0.

## Odottaa (JU:lta pyydetty 08.0x ja 08.1x, jonossa)
- Pari pk2 | pk7v64: kuja05-pk6-20261029/kaanna-pk7v64-cd7cbbdcb.zsh → aja-pk7v64-cd7cbbdcb.zsh (simu-pk7v64.txt). Palatsin mallit
  tulevat file://-juuresta juuri-pk7-v64/ (= LR:n juuri-v118m + v64-paketti, symlinkit), joten v64:n ei tarvitse olla ämpärissä.
  Odotusehto on rivi "juoksupeli: uusi juoksu". Edellisen parin vika: kamerarata-QA on vain drone-haarassa, joten
  juna-214:ssä "kamerarata t" ei koskaan tullut. Videot ensin Sonnetille, sitten KK:lle.
- Drone d: parkour-20261027/kaanna-drone214d-8e36fbac5.zsh → aja-drone214d-8e36fbac5.zsh (simu-drone214d.txt, avaus päällä, 105 s).
  Tarkista t 73–81 (Meridiaaniportti): kameraväli-rivien korkeus ja rnosto, nousu ≤ 2,5 m/s, nousu alkaa ennen porttia. Alku: avaus
  (c:ssä kamerarata-rivejä ei ollut t < 7 s). Sitten vaakavideo KK:lle (Sonnet ensin).

## Jatko keskeytyksestä
- Taustaajoja ei ole. Worktreet: wt/proto-pelikoodari-pk7-214 (pk7-214, puhdas) ja wt/proto-pelikoodari-kaapu-213 (drone-214, puhdas).
- Taso1ReittiTyokalu (MK_JUURI) kaatuu v64-datalla samoin vanhalla ja uudella koodilla (kynnykset [], T:n oikea käännös): työkalun
  odotukset ovat vanhentuneet b758c2fac:n (alku työhuoneesta) jälkeen, eikä tämä ole pelin vika.
