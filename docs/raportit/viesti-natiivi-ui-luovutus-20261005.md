# Natiivi-UI:n luovutus 5.10.2026 klo 06.1x (viikkoraja 97 %, tilinvaihto n. 07.15)

Rooli: Natiivi-UI (Opus, high). Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto, haarat natiivi-ui/<aihe>,
worktreet /Users/Shared/Claude/wt/proto-natiivi-ui-<aihe>. Käännös: lokit/natiivi-ui-1035/skriptit/kaanna-kopioi.sh
<haara[+haara]> vasta Julkaisijan "NYT käännös" -viestistä; .app kopioituu lokit/natiivi-ui-1035/app-<SHA>.
Simu vain Julkaisijan "SIMU NYT" -viestistä, oma iPhone FB234D08-4693-4496-9C7A-6C7C15B03963, iPad
AD119F7B-A2A2-43EE-8769-7326DD757F89; lopuksi sammutus ja "simu vapaa".

## Juna 142 — Päätoimittaja kuittasi, merge-pyynnöt Natiivisepällä
- natiivi-ui/jatka-pulun-kuva 2f56284a — Jatka kuin Ohita; Puhe.Lue jatkohiljaisuuden portin taakse; Jatka-napautuksen
  irrotus ei päätä hiljaisuutta; Ohita näkyy aina automaattisen luennan aikana kartalla; maakuntakortin lisäkysymykset.
- natiivi-ui/vaaka-linssivalikko a4ce9696 — vaakavalikko turva-alueen alareunaan, KESKENERÄISET väkäsen takana,
  linna "Muurien sisällä", Ihmisen matka II keskeneräisiin.
- natiivi-ui/iss-taulu-vaaka eb9fd93b — ISS-taulun asettelusilmukka, taulun ✕ pois, AUTO sammuu vain AUTO-napista ja
  zoomi säilyy.
- natiivi-ui/lipputanko-kiintea 536783f0 — yksi kiinteä tangon paikka per maa, peitossa Lipputanko.Piilota.

## Juna 143 — avoinna
- natiivi-ui/chat-linna b38360f4 — KUITATTU (chat estää linnan eleet ja sulkeutuu linssin avautuessa). Merge-pyyntö
  Natiivisepälle puuttuu vielä → lähetä.
- natiivi-ui/x-napit 9a688396 (oli 63a4552e; 9a688396 = lehden sisällyksen sulkeva napautus ei enää käännä sivua, todettu
  oikealla napautuksella 06.45 xs-6-sisallys-ohi.png; käännös 00d54775 06.46; Päätoimittaja kuittaa 63a4552e+9a688396 junaan 143, kun sisällyksen uusinta näyttää levyn sulkeutuvan ilman sivun kääntymistä: ui lehti ateena → ui lehti sisallys → oikea tap (330, 330)) — ✕-inventaarion poistot (docs/raportit/x-napit-inventaario-20261005.md, päätökset
  Päätoimittajalta). Oikeat napautukset tehty 8 pinnalle + maakuntalappu (natiivi-ui-pohjat/natiivi/xt-arkki.jpg);
  LEHDEN SISÄLLYKSEN ohinapautus uusittava (napautus osui Puluun): ui lehti ateena → ui lehti sisallys → oikea tap
  esim. (330, 300) artikkelikuvaan. Sitten tulokset Päätoimittajalle ja merge-pyyntö. Siivous 16/20/21
  (IssKyytiNakyma sulkuVanha, Linssivalitsin ylaSulje ja Muut-paneeli) kun juna 142 on masterissa.
- natiivi-ui/iss-ohjaamo-lcd 0fdda21f — ohjaamo + LS2:n LCD-paikat; odottaa LS2:n maailmakuvia (Amazonia) ja S2-indeksiä.
- Myöhemmin (Päätoimittaja): ISS-kuvan vihreä nimilappu hukkuu kirkkaalle hiekalle (az-3667-a4).

## Testiskriptit (lokit/natiivi-ui-1035/skriptit)
jatka-aani.sh (ääniraita = Unityn tallenne.wav; JATKA_TAP=1 oikea napautus), aanitaso.py (puhe > −32 dB),
iss-taulu-vaaka.sh (TAP_OHI=1), auto-zoom.sh (TAP_SEUR=1), lippu-kaikki.sh, chat-linna.sh, kartoitus.sh (+ k:-etuliite
kartan komennoille), xn-tap-alku.sh + xn-k.sh (oikeat napautukset simulaattorityökalulla). `ui napauta` ohittaa
osumatestin → todisteisiin aina simun oikea napautus.
