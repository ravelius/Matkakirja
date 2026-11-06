# Natiivisepän luovutus 6.11.2026 klo 07.05 (konteksti 27 %, pehmeä raja, 7.37)

Korvaa -0158:n. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja. Cron "4 9 * * *" unity-julkaisut.py luodaan uudelleen uudessa sessiossa (Raamattu 7.41; polku proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py).

## SEURAAVA TYÖ
Odota KS:n sanaa yhteisestä ajosta. Pyynnöt lähetetty KS:lle ja PT:lle 07.0x (molemmat jonossa, ei vielä kuitattu). Kun lokikansio tulee:
1. Katso täysikoossa, istuvatko talot pohjillaan tasaisella alueella ja reunavyöhykkeellä. Read pienentää yli 2000 px:n kuvat: rajaa ensin (malli `_tyo/natiiviseppa/pariisi-talot/selvitys-c5/ruudut-maa2.py`).
2. Katso koekuva `nd-raja` samalla kameralla kuin m4 (lokit/natiiviseppa-pariisi-maa2-64820ec1a/m4-alueraja.png). Vie KK:lle viat nimettyinä; omistajan päätös kuvasta KK:n kautta.
3. Tarkista lokista `MATKAKIRJA karttatasa`, jotta tiedät, oliko tasaus päällä kuvassa.
Jos KS ei ota 7333833fe:tä tai muuttaa tasauksen laskua, sovi KS:n kanssa. Ei omaa ajoa, ei junaan, ei iPadia.

## Omistajan päätökset 6.11. (PT:n välittäminä)
- 06.55 suojatut talot "Jätetään laatikoina": ei suodatusta talokerrokseen, palat ennallaan. Riski App Storea ennen tarkistuslistalla (11.8).
- 06.58 kartta tasoitetaan keskustassa (vastuu KS, talot samaan maahan KS:n kanssa). Kartan uusi häivytys horisontissa kelpaa. Talojen raja: "En osaa sano", raja ennallaan; yksi koekuva Notre-Damen rajalta seuraavaan yhteiseen ajoon.
- KK 02.1x: m4 ja m1 korvaavat c5:n aamun kuvissa, m3 ei. Korkeuskaavaa ei hiota. Merkin korkeus PT:llä, ei tehdä ennen PT:n sanaa. (KS:n ajohaarassa on natiivi-ui/merkki-pinta-219 9e2d0edba; sen vaikutus tarkistamatta.)

## Tehty
`natiiviseppa/marais-talot` 7333833fe (paikallinen, wt/proto-natiiviseppa-marais; kääntämättä, ajamatta, ei junaan; päällä 132a15b7d). TaloKerros.shader laskee saman tasauspainon kuin tee_tileset.py KORKEUS_RUNKO samoista globaaleista (_maaTasaKeski, _maaTasaRajat, _maaTasaReika, _maaAkseli, _maaKeski). Pohja liukuu arvoon _maaTasaRajat.z, talon oma korkeus säilyy; paino 0 = ennallaan. TaloKerros.cs antaa palan korkeuden `_PalaH`. Odotus, ei todennettu: tasaisella alueella 2 × maa + lisä -virhe poistuu; Montmartren reiässä kaava jää.
Skenaariorivit: `_tyo/natiiviseppa/pariisi-talot/sk-nd-raja-koekuva.txt`.

## Mitattu ajosta maa2 (luvut: `_tyo/natiiviseppa/pariisi-talot/selvitys-c5-raja.md`, päivitys 02.1x)
- Kartan omat talot eivät puutu mäellä: 100 % punaisesta 3 px:n sisällä 3D-talosta (`m5-punainen-siluetti.py`).
- Lisä ruuduittain 8–44 (`lisa-ruuduittain.py`), toistuu ±4 m. 71 %:ssa virhe enintään 6 m. Laen 22 m on yksi 250 m:n ruutu (E −750, N 3500; piste 0,096). Puistot vs korttelit ei ratkea tästä ajosta (3 puistoruutua). KS:n lukujen Louvre 146, Opéra 140, Tuileries 70 lähdettä en löytänyt.
- Sacré-Cœurin merkki noin 310 px kirkon alla: korkeus noin 0 m, pinta noin 258 m (`merkki-korkeus.py`). Syy tarkistamatta.
- Viat kuvissa m1 ja m3, kerrottu KK:lle: rajan sävy ja vaalea juova, Sacré-Cœurin aukko, kaukaisimmat talot pisteinä (TaloKerros.shader clip kohinalla), kartan vaaleat läiskät, vaaleat pisteet saumoissa, kartan talo pilkottaa 2–5 px seinän alta, Pompidoun ikkunaton pääty, tasainen hautausmaa, paljas "Liiku". Vyö ja Contin talot poissa.

## Muu tila (kuten -0158)
Liiku 99748962f odottaa KK:n sanaa (ei lähetetä uudelleen). Kyltit usvassa ilman rakennusta; VS:n kohteet OHJELMA-listaan, kun ovat pelissä; ODbL ennen julkaisua; suorituskyky isossa iPadissa; Ateenan ja Tukholman viat odottavat Pariisia. Maskit sacre-coeur ja montparnasse jäävät; KS:n kuittaus kumoavaan viestiin tarkistamatta.

## Viestit ja työtapa
Varakanava `mcp__ccd_session_mgmt__send_message` toimii. KK local_231e4bad, PT local_cf5b4eca, KS local_ddd980b0, JU local_b4a7e82a. Ajohaara työpuuta koskematta (malli selvityksessä). Palatiedostot python3.14:llä ilman -I:tä. Proto-sha:t löytyvät wt/proto-natiiviseppa-marais-työpuusta, eivät tästä reposta.
