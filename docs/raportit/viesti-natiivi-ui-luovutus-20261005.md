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
- natiivi-ui/chat-linna b38360f4 — KUITATTU, Natiiviseppä mergesi juna-143-koeen (3a6c994e).
- natiivi-ui/x-napit 9a688396 — ✕-inventaarion poistot, KAIKKI todennettu oikealla napautuksella (xt-arkki.jpg,
  xs3-6-sisallys-ohi.png, 06.53); KUITATTU junaan 143, merge-pyyntö lähetetty Natiivisepälle 06.5x.
  Natiiviseppä mergesi juna-143-koeen (a7cd8d44).
- natiivi-ui/x-siivous 121b0840 (07.5x, BUILD 142:n päällä) — siivous 16/20/21: IssKyytiNakyma sulkuVanha (näkyi vain
  avaruuskävelyllä, joka on pois valikosta), Linssivalitsin ylaSulje ja kuollut Muut-paneeli. unity-tarkistus 0 virhettä,
  pohjavahti ok, merge juna-143-koeen puhdas. Käännös 354fa015 (08.14), simussa todennettu 10.2x oikeilla napautuksilla
  (proto-3d/lokit/natiivi-ui-1035/xsiivous/xs-arkki.jpg); lähetetty Päätoimittajalle kuitattavaksi 10.3x → kuittauksen
  jälkeen merge-pyyntö Natiivisepälle. KUITATTU 10.4x, merge-pyyntö Natiivisepälle lähetetty 10.4x.
- POISTU-löydös selvitetty 10.5x kevyellä koneella: vain 0 s:n simutap (painallus ja irrotus samassa kehyksessä) pienentää
  pöydän (IssKytkinpoyta.Napautus PointerDown); 0,1 s toimii. Suositus Päätoimittajalle: ei korjausta junaan 144
  (xsiivous/xp-poistu-arkki.jpg). Todisteissa käytä kytkinpöydän painikkeille duration ≥ 0,1 s.
  Päätoimittaja 10.5x: hyväksytty, ei korjausta. TUNNETTU RISKI: alhaisella fps:llä nopea tap voi osua samaan kehykseen.
  Jos näkyy laitteella (Laitetestaaja kokeilee fyysisellä iPadilla), korjaus osumatestillä (onko painallus pöydän rajojen
  sisällä), EI kehysjärjestyksellä.
- natiivi-ui/iss-ohjaamo-lcd 0fdda21f — ohjaamo + LS2:n LCD-paikat; odottaa LS2:n maailmakuvia (Amazonia) ja S2-indeksiä.
- Myöhemmin (Päätoimittaja): ISS-kuvan vihreä nimilappu hukkuu kirkkaalle hiekalle (az-3667-a4).

## Testiskriptit (lokit/natiivi-ui-1035/skriptit)
jatka-aani.sh (ääniraita = Unityn tallenne.wav; JATKA_TAP=1 oikea napautus), aanitaso.py (puhe > −32 dB),
iss-taulu-vaaka.sh (TAP_OHI=1), auto-zoom.sh (TAP_SEUR=1), lippu-kaikki.sh, chat-linna.sh, kartoitus.sh (+ k:-etuliite
kartan komennoille), xn-tap-alku.sh + xn-k.sh (oikeat napautukset simulaattorityökalulla). `ui napauta` ohittaa
osumatestin → todisteisiin aina simun oikea napautus.
