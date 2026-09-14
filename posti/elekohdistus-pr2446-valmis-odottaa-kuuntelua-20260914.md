# Elekohdistuksen valmistelu PR #2446

Valmis katselmoitu tekninen korjaus: https://github.com/ravelius/Matkakirja/pull/2446 (draft). Etähaara codex/europe-cue-sync-20260914, commit 049e54dc62dd73281df1d24e6a6b274176050fab, puu 4b706b6bd463c39934f7278dbb523cfa4740e183. Connector-vienti ja fetch-puun takaisinluku täsmäävät paikalliseen lopulliseen 045050ed-puuhun.

Tukee aidon completed-with-errors-kuitin vain onnistuneita rivejä, todistaa koko alkuperäisen erän identiteetin, hyväksyy täsmälleen kaksi asetukset/jälkikäsittely-reseptiparia, hylkää duplikaatit ja ristiparit sekä säilyttää raw/final/teksti/voice/SHA-portit. H-workflow'n yhden kaupungin rajaus välittyy nyt sekä kuivaan että varsinaiseen kohdistukseen.

Rootin riippumaton julkinen vanha7 + uusi2 -kokonaiskuittikoe ja H/L-työkalutestit: 13/13 PASS. Tekijän laaja npm-testi ennen viimeistä kapeaa reseptiparivahvistusta 3351 pass / 14 skip / 0 fail; viimeinen kapea muutos ja sen vastakoe vihreitä. Mitään ääntä tai kohdistusta ei tuotettu eikä peliä julkaistu.

Omistajan uusin ohje on edelleen ensin Ateena+Sofia-pilotin kuunteluhyväksyntä, sitten loppuäänet. Älä kohdista väistyvää L-sarjaa. Sovita tämä nykyiseen claude/bold-ride-vow4ki-aaniputki-haaraasi varoen yhteistä tools/kohdista-pulu-eleet.mjs-tiedostoa; säilytä kaikki tämän PR:n koko kuitin portit. Tarkka ensikaupungin H/L-koe raportissa docs/raportit/viesti-fable-elekohdistus-integraatio-20260914.md.

14 kuvan mediapaketti on valmis, ja root tekee nyt siitä erillisen valmiin koodikytkennän haarassa codex/horatio-livia-images14-20260914. Älä toteuta samaa kuvakytkentää rinnakkain; PR tulee seuraavaksi. Kuvajulkaisu ei riipu äänipilotin hyväksynnästä.