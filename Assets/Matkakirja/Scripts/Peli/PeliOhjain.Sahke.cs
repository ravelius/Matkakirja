// PELIOHJAIN: SÄHKE, RETKIKUNTA, KAVERIAPU JA PÖLLÖN SÄHKETEHTÄVÄ (B5, Pelikoodari 23.9.2026).
//
// Web js/sahke.js ja js/fokusvirta.js (PÖLLÖN SÄHKETEHTÄVÄ) natiivin silmukassa:
//   - Sähkepinta (Sahke.cs) käynnistyy, kun sisältö on ladattu ja Natiivi-UI on asettanut
//     PeliNakymat.Sahke. Ilman näkymää linjaa ei avata, eikä peli muutu (web: peli ei hajoa ilman workeria).
//   - Virstanpylväät (aarre löytyi, uusi maa) luetaan pelitilasta jokaisen tallennuksen jälkeen.
//   - Saapuneet sähkeet ja apupyynnöt nousevat liuskana yksi kerrallaan, kun kartta on vapaa.
//   - Kaveriapu (25 £) kysymysnäkymän napista: veloitus Kysely.Kaveriapu, aika pysähtyy, veikkaus
//     palaa kortille; perua saa vasta 10 minuutin tai lähetysvirheen jälkeen.
//   - Sähketehtävä: vihreä piste sähkekaupungissa avaa lomakkeen (PeliNakymat.Sahketehtava). Oikea
//     vastaus → Livia lentää (6,5 s) → paluukupla → laatta kääntyy (Kaupat.AvaaAarreSahkeella).
//     Ilman näkymää piste avaa laattakysymyksen kuten muualla.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed partial class PeliOhjain
    {
        Sahkepinta sahke;
        ISahkeNakyma sahkeNakyma;
        ISahketehtavaNakyma sahketehtavaNakyma;
        Dictionary<string, Sahketehtava> sahketehtavat = new Dictionary<string, Sahketehtava>();
        SahketehtavaTila sahketila = new SahketehtavaTila();
        string sahkeKorttiKaupunki, lentoKaupunki, aarreKaupunki;
        float lentoAika, aarreAika, apuTarkistus;
        string apuAvain;
        bool sahkeKaynnistetty;

        /// <summary>Sähkepinta (Natiivi-UI: retkikuntaosio, liuska). Linja kiinni, kunnes Kaynnista on vastannut.</summary>
        public Sahkepinta Sahke => sahke;

        /// <summary>
        /// Livian kuplat pulun puhekuplaan (web polloPuheenvuoro / polloKuplasarja): (kaupunki, kenttä, kuplat).
        /// Kenttä on webin livianOsatJaAani-avain äänitteiden valintaan: johdanto, odotus, oikein, paluu,
        /// vinkki, linkkiSaate. Kuplat tulevat peräkkäin samaan paikkaan.
        /// </summary>
        public event Action<string, string, IReadOnlyList<string>> LivianKuplat;

        /// <summary>
        /// Natiivi-UI asettaa: sähketehtävän hakemiston lähteet maalle (ISO3 → otsikot: maan lehti, maan
        /// kaupunkien lehdet ja fokusvirrat, karttakohteet; web sisaltohakemisto). null = tyhjä hakemisto,
        /// jolloin vain vapaa vastaus käy.
        /// </summary>
        public static Func<string, IEnumerable<string>> SahkeHakemisto;

        /// <summary>
        /// Natiivi-UI asettaa: kartan kohdekortti (maa ISO3, kohteen tunnus) Livian linkille (web kohdeavaus).
        /// Palauttaa, aukesiko. null = kohdelinkki ei vielä toimi natiivissa.
        /// </summary>
        public static Func<string, string, bool> AvaaKohde;

        void AlustaSahke()
        {
            sahkeNakyma = PeliNakymat.Sahke?.Invoke(gameObject);
            sahketehtavaNakyma = PeliNakymat.Sahketehtava?.Invoke(gameObject);
            sahke = new Sahkepinta(new SahkeYhteys(), SahkeYhteys.Lue, SahkeYhteys.Kirjoita);
            sahke.Muuttui += SahkeMuuttui;
            kysymysToiminnot.KysyKaverilta = () => KysyKaverilta();
            kysymysToiminnot.KaveriapuValmis = () => KaveriapuValmis();
        }

        /// <summary>
        /// Terveystarkistus ja ensimmäinen tilakysely (web kytkeSahke), kun sisältö on ladattu.
        /// pakota: testikomento 'sahke kaynnista' avaa linjan ilman Natiivi-UI:n näkymää.
        /// </summary>
        public string KaynnistaSahke(bool pakota = false)
        {
            if (sahke == null || verkko == null) return "peli ei ole valmis";
            if (sahkeNakyma == null && !pakota) return "sähkenäkymää ei ole (PeliNakymat.Sahke)";
            if (sahkeKaynnistetty && sahke.Linja != false) return null;
            sahkeKaynnistetty = true;
            sahke.KaupunginNimi = SahkePohjat.Nimet(verkko);
            sahke.Kaynnista(auki =>
            {
                Debug.Log("MATKAKIRJA peli: sähkelinja " + (auki ? "auki" : "kiinni") + (sahke.Tunnus != null ? ", retkikunta " + sahke.Tunnus.Koodi : ""));
                // Lähtötilanne heti: kesken jäänyt peli ei sähkötä vanhoja aarteita uudestaan.
                if (auki && matka != null) sahke.Virstanpylvaat(matka);
                PaivitaRetkikunta();
            });
            return null;
        }

        /// <summary>Uusi tai jatkettu matka (web nollaaSahke): jono, apu ja virstanpylväät nollille; retkikunta säilyy.</summary>
        void SahkeKytke(Matka m)
        {
            sahketila = new SahketehtavaTila();
            lentoKaupunki = aarreKaupunki = null;
            if (sahkeKorttiKaupunki != null) SuljeSahkekortti();
            if (sahke == null) return;
            sahke.Nollaa();
            sahkeNakyma?.SuljeLiuska();
            if (sahke.LinjaAuki) sahke.Virstanpylvaat(m);
        }

        /// <summary>Tallennuksen jälkeen: virstanpylväät pelitilasta (web paivitaSahke joka piirrossa).</summary>
        void SahkeTallennettu()
        {
            if (sahke == null || matka == null || !sahke.LinjaAuki) return;
            try { sahke.Virstanpylvaat(matka); }
            catch (Exception e) { Debug.LogException(e); }
        }

        void SahkeMuuttui()
        {
            PaivitaRetkikunta();
            if (Tila == SilmukanTila.Kysymys && AvoinTehtava == Tehtava.Kysymys && KysymysTila != null && !KysymysTila.Vastattu) NaytaKysymys();
        }

        void PaivitaRetkikunta()
        {
            if (sahkeNakyma == null || sahke == null) return;
            try { sahkeNakyma.NaytaRetkikunta(sahke.Retkikunta(), RetkikuntaToiminnot()); }
            catch (Exception e) { Debug.LogException(e); }
        }

        RetkikuntaToiminnot RetkikuntaToiminnot() => new RetkikuntaToiminnot
        {
            ArvoNimet = () => sahke.ArvoNimet(),
            Perusta = (nimi, valmis) => sahke.Perusta(nimi, r => RetkikuntaValmis(r, valmis)),
            Liity = (koodi, nimi, valmis) => sahke.Liity(koodi, nimi, r => RetkikuntaValmis(r, valmis)),
            Paikat = pohjaId => sahke.Paikat(SahkePohjat.Hae(pohjaId), matka),
            Laheta = (pohjaId, paikkaId, valmis) => sahke.LahetaVinkki(pohjaId, paikkaId, matka, valmis),
            Eroa = () => { sahke.Eroa(); sahkeNakyma?.SuljeLiuska(); },
        };

        void RetkikuntaValmis(string rivi, Action<string> valmis)
        {
            // Uusi jäsen: lähtötilanne kirjataan heti, ettei jo löydetty aarre lähde sähkeenä.
            if (rivi == null && matka != null) sahke.Virstanpylvaat(matka);
            Debug.Log("MATKAKIRJA peli: retkikunta " + (rivi ?? "ok, koodi " + sahke.Tunnus?.Koodi));
            valmis?.Invoke(rivi);
        }

        /// <summary>Ruudun välein: pollaus, kaveriavun kortti ja jonon liuska (web paivitaSahke).</summary>
        void PaivitaSahke()
        {
            if (sahke == null) return;
            PaivitaSahkelento();
            if (!sahke.LinjaAuki) return;
            try
            {
                sahke.Aja();
                if (sahke.Apu != null && matka != null)
                {
                    sahke.PaivitaApu(matka);
                    // Odotuskortin minuuttirivi ja peruutusnappi päivittyvät ajan kuluessa.
                    if (Tila == SilmukanTila.Kysymys && Time.unscaledTime >= apuTarkistus)
                    {
                        apuTarkistus = Time.unscaledTime + 1f;
                        var k = sahke.Apukortti(matka);
                        var avain = k == null ? null : k.Nappi + "|" + k.Alarivi + "|" + k.VeikattuIndeksi + "|" + k.Virhe;
                        if (avain != apuAvain) { apuAvain = avain; if (KysymysTila != null && !KysymysTila.Vastattu) NaytaKysymys(); }
                    }
                }
                NostaLiuska();
            }
            catch (Exception e)
            {
                // Sähke on lisäys peliin, ei sen ehto (web paivitaSahke).
                Debug.LogException(e);
            }
        }

        /// <summary>Jonon seuraava liuska, kun kartta on vapaa (web sahkeRuutuVapaa: ei dialogia, korttia eikä lentoa).</summary>
        void NostaLiuska()
        {
            if (sahkeNakyma == null || sahkeNakyma.LiuskaAuki || sahke.Jono.Count == 0) return;
            if (!Kaytossa || Tila != SilmukanTila.Kartta || KorttiKaupunki != null || ajoValmis != null) return;
            var v = sahke.SeuraavaJonosta();
            if (v == null) return;
            sahkeNakyma.NaytaLiuska(v,
                i => sahke.Veikkaa(v, i, () => sahkeNakyma.SuljeLiuska()),
                () => { });
        }

        void SahkeEtualalle()
        {
            if (sahke != null && sahke.LinjaAuki) sahke.Etualalle();
        }

        // --- kaveriapu -----------------------------------------------------------

        /// <summary>Kysymysnäkymän kaveriapunappi ja -kortti (web sahkePaivitaApu).</summary>
        void LisaaKaveriapu(KysymysNaytto d)
        {
            if (d == null || sahke == null || !sahke.LinjaAuki || matka == null) return;
            var nappi = sahke.Apunappi(matka);
            // Nappi samalla portilla kuin 50:50: ei tervehdyssivulla eikä vastattuun.
            d.Kaveriapu = nappi.Nakyy && !d.TervehdysVaihe && !d.Vastattu ? nappi : null;
            d.KaveriapuKortti = sahke.Apukortti(matka);
        }

        /// <summary>Kaveriavun odotus pysäyttää kysymyksen ajan (web sahkePysaytaKello).</summary>
        bool KelloPysaytetty => sahke != null && matka != null && sahke.KelloPysaytetty(matka.Tila.Kysely.Kysymys);

        /// <summary>"Kysy kaverilta (25 £)" (näkymä ja testikomento 'kaveriapu'). Virhe tai null.</summary>
        public string KysyKaverilta()
        {
            if (sahke == null) return "sähkelinja ei ole käytössä";
            if (Tila != SilmukanTila.Kysymys || AvoinTehtava != Tehtava.Kysymys) return "kysymys ei ole auki";
            var t = sahke.KysyKaverilta(kysely);
            if (!t.Ok) { NaytaKysymys(t.Virhe); return t.Virhe; }
            Aanita(Aanitunnukset.Vihje);
            Tallenna();
            NaytaKysymys();
            Debug.Log("MATKAKIRJA peli: kaveriapu " + sahke.Apu?.ApuId + ", raha " + matka.Tila.Pelaaja.Raha);
            return null;
        }

        /// <summary>Kaveriavun kortin "Selvä" / "Peru odotus" (testikomento 'kaveriapu-valmis'). Virhe tai null.</summary>
        public string KaveriapuValmis()
        {
            if (sahke == null || sahke.Apu == null) return "kaveriapu ei ole kesken";
            if (!sahke.SuljeApu()) return "odotusta voi perua vasta 10 minuutin kuluttua";
            if (Tila == SilmukanTila.Kysymys && AvoinTehtava == Tehtava.Kysymys) NaytaKysymys();
            return null;
        }

        // --- pöllön sähketehtävä ---------------------------------------------------

        void LueSahketehtavat(string fokusvirrat)
        {
            try { sahketehtavat = Sahketehtava.LueKokoelma(fokusvirrat); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA peli: sähketehtävät eivät jäsenny: " + e.Message); sahketehtavat = new Dictionary<string, Sahketehtava>(); }
            if (sahketehtavat.Count > 0) Debug.Log("MATKAKIRJA peli: sähketehtäviä " + string.Join(", ", sahketehtavat.Keys));
        }

        void Kuplat(string kaupunki, string kentta, IReadOnlyList<string> kuplat)
        {
            if (kuplat == null || kuplat.Count == 0) return;
            try { LivianKuplat?.Invoke(kaupunki, kentta, kuplat); } catch (Exception e) { Debug.LogException(e); }
        }

        /// <summary>
        /// Vihreä piste sähkekaupungissa (web avaaFokusKohtaaminen, sahketehtava): lomake tai lähetetyn
        /// kuittaus. Livian palattua lennolta (pelaaja oli poissa) napautus kääntää laatan. Virhe tai null.
        /// </summary>
        public string AvaaSahketehtava(string kaupunki)
        {
            if (matka == null) return "peli ei ole valmis";
            if (kaupunki == null || !sahketehtavat.TryGetValue(kaupunki, out var t)) return "kaupungissa ei ole sähketehtävää";
            if (Tila != SilmukanTila.Kartta && Tila != SilmukanTila.Sahketehtava) return "silmukka on tilassa " + Tila;
            if (sahketila.LentoKesken(kaupunki) && lentoKaupunki == null && aarreKaupunki == null && sahketila.PaluuValmis(matka, kaupunki))
            {
                // Livia palasi, kun pelaaja oli poissa: paluu ja aarre nyt (web: seuraava pisteen napautus).
                Kuplat(kaupunki, "paluu", t.Paluu);
                PaljastaSahke(kaupunki);
                return null;
            }
            PiilotaKortti();
            dialogi.PiilotaHeitto();
            sahkeKorttiKaupunki = kaupunki;
            Tila = SilmukanTila.Sahketehtava;
            PysaytaKamera();
            NaytaSahkekortti(t, true);
            return null;
        }

        void NaytaSahkekortti(Sahketehtava t, bool avaus)
        {
            var maa = t.HakemistoMaa ?? (verkko.Kaupungit.TryGetValue(t.Kaupunki, out var k) ? k.Maa : null);
            IEnumerable<string> lahteet = null;
            try { lahteet = maa != null ? SahkeHakemisto?.Invoke(maa) : null; } catch (Exception e) { Debug.LogException(e); }
            var kortti = SahketehtavaTila.Pullat(sahketila.Kortti(t, lahteet), t, kaupat);
            if (avaus) Kuplat(t.Kaupunki, sahketila.Vastattu(t.Kaupunki) ? "odotus" : "johdanto", kortti.Kuplat);
            if (sahketehtavaNakyma == null) return;
            try { sahketehtavaNakyma.Nayta(kortti, SahkeToiminnot(t)); }
            catch (Exception e) { Debug.LogException(e); }
        }

        SahketehtavaToiminnot SahkeToiminnot(Sahketehtava t) => new SahketehtavaToiminnot
        {
            Laheta = arvot => KasitteleSahkevastaus(t, sahketila.Laheta(t, arvot)),
            LahetaVapaa = (teksti, valmis) => LahetaVapaaSahke(t, teksti, valmis),
            OstaVinkki = t.Vinkki.Count > 0 && t.Id != null ? () => OstaSahkepulla(t, true) : (Func<KauppaTulos>)null,
            OstaLinkki = t.Vastauslinkki != null && t.Id != null ? () => OstaSahkepulla(t, false) : (Func<KauppaTulos>)null,
            AvaaLinkki = () => AvaaSahkelinkki(t),
            Sulje = () => SuljeSahkekortti(),
        };

        /// <summary>Vastauksen seuraus: oikein → kuittaus ja lento, ohi → paluusähke ja uusi kortti.</summary>
        SahkeVastausTulos KasitteleSahkevastaus(Sahketehtava t, SahkeVastausTulos r)
        {
            switch (r.Laji)
            {
                case SahkeVastausLaji.Osui: SahkeOsui(t); break;
                case SahkeVastausLaji.Ohi:
                    Aanita(Aanitunnukset.Vaarin);
                    if (sahkeKorttiKaupunki == t.Kaupunki) NaytaSahkekortti(t, false);
                    break;
                default:
                    if (sahkeKorttiKaupunki == t.Kaupunki && r.Laji != SahkeVastausLaji.Pollolle) NaytaSahkekortti(t, false);
                    break;
            }
            Debug.Log($"MATKAKIRJA peli: sähketehtävä {t.Kaupunki} {r.Laji}, ohi {r.Ohi}, palkkio {r.Palkkio}");
            return r;
        }

        void LahetaVapaaSahke(Sahketehtava t, string teksti, Action<SahkeVastausTulos> valmis)
        {
            var r = sahketila.LahetaVapaa(t, teksti);
            if (r.Laji != SahkeVastausLaji.Pollolle) { valmis?.Invoke(KasitteleSahkevastaus(t, r)); return; }
            // Paikallinen tulkinta ei osunut: pöllö tuomitsee (enintään 10 s; ei vastausta = ei ohilyöntiä).
            SahkeYhteys.Tuomio(t.Id, teksti, tuomio =>
            {
                if (this == null) return;
                valmis?.Invoke(KasitteleSahkevastaus(t, sahketila.PollonTuomio(t, tuomio)));
            });
        }

        /// <summary>Web sahkeOsui: kuittauskortti, Livian kuittaus kuplaan ja lento käyntiin.</summary>
        void SahkeOsui(Sahketehtava t)
        {
            Aanita(Aanitunnukset.Oikein);
            Livia("success");
            if (sahketehtavaNakyma != null && sahkeKorttiKaupunki == t.Kaupunki)
            {
                try { sahketehtavaNakyma.Nayta(sahketila.KuittausKortti(t), SahkeToiminnot(t)); }
                catch (Exception e) { Debug.LogException(e); }
            }
            Kuplat(t.Kaupunki, "oikein", t.Oikein);
            lentoKaupunki = t.Kaupunki;
            lentoAika = Time.unscaledTime + SahkeTulkinta.LentoMs / 1000f;
        }

        /// <summary>Lennon ja paluun ajastimet (web aloitaSahkelento, paljastaSahkeAarre).</summary>
        void PaivitaSahkelento()
        {
            if (lentoKaupunki != null && Time.unscaledTime >= lentoAika)
            {
                var k = lentoKaupunki;
                lentoKaupunki = null;
                // Pelaaja lähti tai laatta käännettiin muuta tietä: paluu odottaa pisteen napautusta.
                if (matka != null && sahketila.PaluuValmis(matka, k) && sahketehtavat.TryGetValue(k, out var t))
                {
                    Kuplat(k, "paluu", t.Paluu);
                    aarreKaupunki = k;
                    aarreAika = Time.unscaledTime + SahkeTulkinta.PaluuMs / 1000f;
                }
            }
            if (aarreKaupunki != null && Time.unscaledTime >= aarreAika)
            {
                var k = aarreKaupunki;
                aarreKaupunki = null;
                if (matka != null && sahketila.PaluuValmis(matka, k)) PaljastaSahke(k);
            }
        }

        /// <summary>Laatta kääntyy sähkeen voimalla (web paljastaSahkeAarre → Kaupat.AvaaAarreSahkeella).</summary>
        void PaljastaSahke(string kaupunki)
        {
            if (!sahketehtavat.TryGetValue(kaupunki, out var t)) return;
            if (sahkeKorttiKaupunki != null) SuljeSahkekortti();
            var r = KauppaTeko(ka => sahketila.Paljasta(ka, t));
            Debug.Log($"MATKAKIRJA peli: sähkeaarre {kaupunki} → {(r.Ok ? "ok" : r.Virhe)}, raha {matka?.Tila.Pelaaja.Raha}");
        }

        KauppaTulos OstaSahkepulla(Sahketehtava t, bool vinkki)
        {
            var r = KauppaTeko(ka => vinkki ? SahketehtavaTila.OstaVinkki(ka, t) : SahketehtavaTila.OstaLinkki(ka, t));
            if (!r.Ok) return r;
            // Kokonainen pulla ostaa sanat (kupla), puolikas pelkän osoitteen (linkkinappi kortille).
            Kuplat(t.Kaupunki, vinkki ? "vinkki" : "linkkiSaate", vinkki ? t.Vinkki : t.LinkkiSaate);
            if (sahkeKorttiKaupunki == t.Kaupunki) NaytaSahkekortti(t, false);
            return r;
        }

        /// <summary>Livian linkki (web avaaVastauslinkki): lehden sivu tai kartan kohde; kortti sulkeutuu alta.</summary>
        string AvaaSahkelinkki(Sahketehtava t)
        {
            var l = t.Vastauslinkki;
            if (l == null) return "linkkiä ei ole";
            if (kaupat == null || !kaupat.PullaOstettu(t.PullaAvain("linkki"))) return "linkki ei ole ostettu";
            if (l.Tyyppi == "kohde")
            {
                if (AvaaKohde == null) return "kartan kohdekortti ei ole vielä natiivissa";
                SuljeSahkekortti();
                bool auki = false;
                try { auki = AvaaKohde(l.Maa, l.Kohde); } catch (Exception e) { Debug.LogException(e); }
                return auki ? null : "kohde ei auennut";
            }
            if (l.Tyyppi == "lehtisivu")
            {
                if (!LehtiOn) return "lehteä ei ole";
                var kaupunki = l.Kaupunki != null && verkko.Kaupungit.ContainsKey(l.Kaupunki) ? l.Kaupunki : t.Kaupunki;
                SuljeSahkekortti();
                PiilotaKortti();
                dialogi.PiilotaHeitto();
                Tila = SilmukanTila.Lehti;
                lehdenKaupunki = kaupunki;
                if (lehtiNakyma != null)
                    lehtiNakyma.Nayta(new LehtiAvaus { Kaupunki = kaupunki, Sivu = l.Sivu }, LehtiTilaNyt(kaupunki), TeeLehtiTeko);
                else AvaaLehti(kaupunki);
                return null;
            }
            return "tuntematon linkki " + l.Tyyppi;
        }

        /// <summary>Kortti kiinni ("Myöhemmin", "Selvä", "Anna Livian mennä", ✕; testikomento 'sahketehtava sulje').</summary>
        public string SuljeSahkekortti()
        {
            if (sahkeKorttiKaupunki == null) return "sähkekortti ei ole auki";
            sahkeKorttiKaupunki = null;
            try { sahketehtavaNakyma?.Sulje(); } catch (Exception e) { Debug.LogException(e); }
            if (Tila == SilmukanTila.Sahketehtava) Kartalle(false);
            return null;
        }

        /// <summary>Testikomento 'sahketehtava laheta aukko=arvo …': lomakkeen lähetys ilman näkymää.</summary>
        public string SahkeLaheta(IReadOnlyDictionary<string, string> arvot)
        {
            if (sahkeKorttiKaupunki == null || !sahketehtavat.TryGetValue(sahkeKorttiKaupunki, out var t)) return "sähkekortti ei ole auki";
            var r = KasitteleSahkevastaus(t, sahketila.Laheta(t, arvot));
            return r.Laji == SahkeVastausLaji.Osui || r.Laji == SahkeVastausLaji.Ohi ? null : r.Laji + ": " + r.Teksti;
        }

        /// <summary>Testikomento 'sahketehtava vapaa teksti': vapaa vastaus (pöllön tuomio kirjautuu lokiin).</summary>
        public string SahkeVapaa(string teksti)
        {
            if (sahkeKorttiKaupunki == null || !sahketehtavat.TryGetValue(sahkeKorttiKaupunki, out var t)) return "sähkekortti ei ole auki";
            LahetaVapaaSahke(t, teksti, null);
            return null;
        }

        /// <summary>Sähkeen tila peli-tila.json:iin (testit ja laitetestaaja).</summary>
        string SahkeJson()
        {
            if (sahke == null) return "null";
            var t = sahke.Tunnus;
            var apu = sahke.Apu;
            var k = sahkeKorttiKaupunki ?? matka?.Tila.Pelaaja.Sijainti.Kaupunki;
            bool tehtava = k != null && sahketehtavat.ContainsKey(k);
            string B(bool b) => b ? "true" : "false";
            return "{\"linja\":" + (sahke.Linja.HasValue ? B(sahke.Linja.Value) : "null")
                + ",\"nakyma\":" + B(sahkeNakyma != null)
                + ",\"retkikunta\":" + PeliApu.Json(t?.Koodi) + ",\"nimimerkki\":" + PeliApu.Json(t?.Nimimerkki)
                + ",\"jono\":" + sahke.Jono.Count + ",\"liuska\":" + B(sahkeNakyma != null && sahkeNakyma.LiuskaAuki)
                + ",\"apu\":" + (apu == null ? "null" : "{\"apuId\":" + PeliApu.Json(apu.ApuId) + ",\"veikkaus\":" + (apu.Veikkaus?.ToString() ?? "null")
                    + ",\"vastaaja\":" + PeliApu.Json(apu.Vastaaja) + ",\"virhe\":" + PeliApu.Json(apu.Virhe) + "}")
                + ",\"kelloSeis\":" + B(KelloPysaytetty)
                + ",\"tehtava\":" + (!tehtava ? "null" : "{\"kaupunki\":" + PeliApu.Json(k) + ",\"kortti\":" + B(sahkeKorttiKaupunki != null)
                    + ",\"ohi\":" + sahketila.Ohi(k) + ",\"vastattu\":" + B(sahketila.Vastattu(k)) + ",\"lento\":" + B(lentoKaupunki == k || aarreKaupunki == k)
                    + ",\"palkkio\":" + sahketila.Palkkio(sahketehtavat[k], k) + "}")
                + "}";
        }
    }
}
