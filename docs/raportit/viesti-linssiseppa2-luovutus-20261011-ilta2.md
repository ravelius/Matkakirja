# Linssiseppä 2 – luovutus 11.10.2026 klo 19.4x (uudelleenkäynnistys)

Edellinen: viesti-linssiseppa2-luovutus-20261011-ilta.md. Proto-worktreet: wt/proto-linssiseppa2-muisti (haara nyt
linssiseppa2/google-429-vara) ja wt/proto-linssiseppa2-museo (linssiseppa2/keittio-grafiikka). Skriptit /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/.

## VALMIS
- **Pariisi v6k19** (Banque v3c + Branly v3d): PT kuittasi, viety (_valmiit/omat-mallit-vienti-20261011d), OSOITIN uusin-4 → v6k19 (Julkaisija 19.4x).
- **Raketti lensi perille** (e560bbef7-käännöksen edeltäjä 885c001c5, todistus-raketti-taysi-20261011-1840): kaikki vaiheet + Cupola.
  Korjaus a861c67c9 (iss-raketti): ensimmäinen alustan fakta (Andøya vs. ISS) alustalla, Enintaan 5, testi (1454/1454). Käännös e560bbef7.

## KÄYNNISSÄ (irrotettuja, selviävät uudelleenkäynnistyksestä)
- ketju-simut-19.zsh: iPad keittiö V3 (d00bd6b37) → iPhone 429-vara (a40e44542, käännös linjalla 2) → raketti (e560bbef7).
  Tila lokit/linssiseppa2-simut-19.log ("SIMUT VALMIS" lopussa) → ilmoita Julkaisijalle SIMU VAPAA.
- 429-mittaus _tyo/linssiseppa2/ion429/loki.tsv (25 × 5 min, loppuu ~20.52) → yhteenveto PT:lle klo ~21 (osuus 429, pisimmät jaksot; 6.10. lokit grep).

## AVOIN
0. **KEITTIÖ V3 YÖ HYVÄKSYTTY SUUNNAKSI (PT 19.5x)**: oletusvalotus −1 EV (122dc77fb), kolmikko c962bad79. Lisätty kalkin alle hento kiven
   kohokuvio (keittio-grafiikka, ks. git log) → käännä + kuva; sitten hdr-yo-kartat ämpäriin (vie-paketti.sh, esim. dioraama/kokeet/keittio-hdr-yo/)
   ja NS:n iPad-mittaus (poikki hdr https://media.matkakirja.app/...) → ennen | V3 omistajalle PT:n kautta.
1. **Grafiikan pystyleike (keittiö)**: V1 (kiilto, värimäärittely) + V2 (LR:n HDR-leivonta, albedo + RGBM-irradianssi) + V3 (yöleivonta
   kalkkiseinillä + esineiden valoluotaimet L1-SH) haarassa keittio-grafiikka d00ce68f5. Testikomennot: poikki grafiikka 0|1|2,
   poikki hdr <file-kansio> | valotus EV, poikki kavely siirra x y z yaw pitch. Kartat _tyo/linssiseppa2/grafiikka/hdr-yo (hdr_png.py).
   PT: yön tuntu säilyy (2 EV liian ilta), fps + muisti iPadilla (Natiiviseppä) ENNEN omistajan kuvaparia → kartat ämpäriin vie-paketti.sh:lla
   (laite ei lue file://), sitten kolmikko ennen | V2 | V3 PT:lle. Kuvat docs/raportit/kaappaukset/linssiseppa2-grafiikka-20261011/.
   Seuraavaksi myös Branlyn omien mallien materiaalit ja kattomuodot LR:lle (PT 18.5x).
2. **Madrid Puerta del Sol** (musta "vesi" = karkea aluskerros maan yläpuolella): korjaus aluskerros-stencil 589aecae0 (stencil 64), käännetty
   (app-madrid); vahvistus odottaa, että Google-laatat vastaavat (429). Sitten kuva PT:lle → SHA Natiivisepälle (183).
3. **Google 429 -vara** (omistaja + PT, junaan 183): google-429-vara a40e44542 (pehmeä vara ilman OSM-taloja, taustakoetus 5/15/30/60 s
   ±25 %, Bearer, ei taustalla). NS katselmoi. Koe sk-vara.txt → kuvapari (vanha vara valkoisine taloineen: todistus-madrid-sol-20261011-1835) PT:lle.
4. **Raketti**: tallenne äänen kanssa ja kuva-arkki PT:lle, kun Pelikoodarin äänet (skeeman 1.63 jälkeen) on kytketty RakettiLaukaisu.Aanet-koukkuihin.
   SHA junaan 183 PT:n kuittauksen jälkeen.
5. Levy: app-kopiot lokit/linssiseppa2-app-{grafiikka,raketti,madrid,vara} (~460 Mt kpl) pois, kun erät kuitattu.
