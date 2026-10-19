# Päätoimittajan luovutus 19.10.2026 klo 08.4x (oma nollaus, konteksti 33 %)

PT local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31 (gmail-tili). KK local_8e4fcfed-fc40-464c-854a-1d031b005332 (nollautui 08.3x). Id:t /Users/Shared/Claude/osoitekirja.md.
Edellinen: viesti-fable-luovutus-20261019-aamu.md (käsitelty kokonaan). Asemataulu https://claude.ai/artifact/R6VQFTUNq629zSzah719Uy (aloitusviestin Rq5aj… on vanha tili).
Tämän checkoutin haara on vanha: lue `git show origin/main:<polku>`, docs-PR:t worktreellä origin/mainista.

## 1. Omistajan päätökset tänään (kaikki lokissa tai PR #4893:ssa)
- 07.12 viikkoraja 100 % (99 %:ssa rivi); B5 TASAN 11 Codex-havainnekuvaa (tulleet h01–h11, kuitattu 4a68b807f).
- 07.20 "Työstän tätä codexin kanssa, ei pyydetä mitään muutoksia." → ei makumuutospyyntöjä hahmoihin (KK 08.30: teknisiä toimitusmuotokorjauksia saa pyytää).
- 07.31 C6 Raamattu 14 lukuun "Kyllä"; koeotto ennen äänierää "Ei".
- 08.15 juoksupeli: "Uusi rata maailman läpi" = Rata v4 (PK koodannut 572d4eb97).
- 08.20 kameraliikkeet ilman nykäyksiä → Linssisepän Kamerajohtaja-suunnitelma HYVÄKSYTTY (oma järjestelmä, vahti lähtötaso 70, CI-kameratesti, ruutuaikavahti > 20 ms).
- 08.28 Codex = kaikki grafiikka ja Tripo-mallit; Claude = koodi, kokoaminen, valo, kamera, tarkistus. VS:n oma Tripo peruttu.
- 08.30 juoksupeli keskustellaan vain KK:n kanssa (Codexille välitetty c1b47d2b8).
- 08.33 Olavinlinnan tauko POIS, tehdään loppuun. Lista docs/raportit/olavinlinna-valmiiksi-lista-20261019.md (TÄMÄN checkoutin työhakemistossa, ei committoitu → committaa tai siirrä).

## 2. Juna 204 (runko NS f0fe70139, VIHREÄ)
Mukana: PK 58cabb404 + d2c30b96e + a9513c71d (B6/B7 nipistys + vipu, C2 Cupola, C4 maksulliset, iPadin pitkä vipu + SEIS-lovi), NUI 1410ef1d7 (B3+B4) + bcd63d8e9 (B2 ympyräikkuna 2:3 + Peruuta), LS 324189a20 (Louvren nainen, k1.glb ämpärissä) + c9c36c33c (Mona Lisa).
EI mukana: PK d1fcf02d6 (konflikti, hylätty). Odottaa:
- NUI: C1 logo 42faaca8e, B2- ja B4c-simukuvat (2027bdc81 ryhmäsiirto + 10 duplikaattia pois; sirut 12 pt, 3 riviä sallittu, keskilinja — KK:n vastaus) → kuvaparit PT → KK.
- VS: B5 kierros 2 (hurrikaani MODIS, pimennys v2, vanat k7) ~09.30 käännös; kuvaparit vasta ≥ 7.
- LS: Mona Lisan lopun nykäys (esilataus + ristihäivytys, 444b12a82) → video PT → KK; sitten Kamerajohtaja (a) ydin+vahti+testit → (b) museon pilotti → PT jakaa (c) VS/KS/PK.
- KS: kohdekaupungit a58c817ba, kuvapari simuvuorolla. LR: sali-v2q (GG-kaaret) simuvuorolla ~09.00.
- PK: simuvuoro rata 1 (e04149615, Pelit › Keskeneräiset) + Rata v4 kerralla → video PT → KK. Esteet Codexin yhteenvedon jälkeen.
- iPadin vivun lopullinen simukuva asteikkoineen ennen 204:n lukitusta (KK).
Asemataulu: scratchpad/asemataulu/data/talo/junat.json ja eteneminen.json päivitetty (Juna 204 edistys 2, tarkistin 0 virhettä).

## 3. PR:t
- #4893 Raamattu 14 lukua (3639062a1, koko 427 → 318 KiB, siirtotaulukko docs/raportit/raamattu-siirtotaulukko-20261019.md): CI kesken → merge vihreänä (squash), poista wt fable-raamattu-rakenne `tools/uusi-worktree.sh --poista fable-raamattu-rakenne`. Jälkeen CLAUDE.md:n viittaukset vanhentuvat (r. 12, 15, 29, 34, 39, 43, 48, 73, 82, 106, 116) → vain omistajan viestillä PT:n ikkunassa (TOIMI pyydetty KK:lta).
- #4895 LR Codex-3D-toimitusmuoto + tuontiportti (491f8d5cb): CI kesken → merge vihreänä (LR poistaa oman wt:n).
- Mergetty: #4885 loki, #4886 Asemataulun ohje + tarkista-junat.py, #4887 Python-kielipakko (Postivahti ajaa tarkista-puhekutsut.sh).

## 4. Codex-posti (kaikki kuitattu)
fc0236a4f ympyräikkuna, 07910288f korjauspyyntöjen peruutus, e521e0a3e juoksupeli v4, 4a68b807f h01–h11, 158037d48 toimitusmuoto + tekniset korjaukset (sisapiha.glb 1 721 primitiiviä > 300; hahmojen juuren skaala 1,37–1,79). Seuraava odotettu: Codexin juoksupeli-yhteenveto (esteet) → PK.

## 5. Odottaa KK:n korttia
Olavinlinnan Tripo-pilotti (kokki + portinvartija, ≤ 14 generointia) ja uusi sessio "Olavinlinna (Opus, high)" (PT kannattaa; luo hyväksynnällä start_session + osoitekirja); juoksupelin 4 estemallia + Puyin tarttumisliike Codexilta; CLAUDE.md-TOIMI.

## 6. Roolit
SK: ISS-skanneri erät 1–6 mainissa (#4884, #4888–#4892), erät 7–10 työn alla. Äänittäjä: pulun-historia.mjs kielipakko. Siirtoseppä levossa (ei töitä painopisteissä). Postivahti: wt-siivous, levy 67 Gi.
