// KARTUSSI JA ISOISÄN MUSTE (Natiivi-UI, ELÄVÄ KARTTA; omistaja hyväksyi videon 26.9.2026 → pelattava build 19).
// Suunnitelma docs/raportit/elava-kartta-suunnitelma-20260926.md kohta 3, käsikirjoitus 8,0–11,5 s "Maakunta herää".
// Pelilogiikka ja tapahtumat ovat Pelikoodarin (PeliOhjain.Muste.cs, Peli/KarttaMuste.cs); tämä vain näyttää ne.
//
// Avattu kartussi, ylimpänä (piilossa, kun maalla ei ole maakuntanostoja):
//      MAAKUNNAT   1/14   ▬▬───────          tutkimuspalkki (142:n palkkien tyyliin): heränneet maakunnat / kaikki
//      NOSTOT      1/97   ▬─────────         löydetyt nostot / kaikki (salaisuudet eivät kuulu laskuriin)
//      [kuva] Attiki                ●○○○○○○  heränneet maakunnat (tuoreimmat ensin, enintään 3): pikkukuva leimana,
//                                            käsialanimi (Kirjasin.Kauno) ja mustepisteet löydetyt/kaikki (yli 10 → luku)
// Maakunta herää (MaakuntaHeraa): rivin nimi kirjoittuu merkki kerrallaan 1,2 s, sitten pikkukuva leimautuu 0,3 s
// (skaala 1,3 → 1, kierto −6° → −2°, peitto 0 → 1). Kiinni olevassa kartussissa herätys odottaa seuraavaa avausta.
// Maakunta valmis (MaakuntaValmis): kartussiin masto-osan alle pieni rivi "Maakunnan salaisuus löytyi: X ›", joka avaa
// salaisuuden kortin; rivi pysyy, kunnes kortti on avattu (NostonMuste.Loydetty). Ei ponnahdusta kartan päälle.
// Maa valmis (kaikkien maakuntien Loydetyt == Kaikki) → lippu liehuu (löydös 144, Liput.Aaltoile); muuten staattinen kuva.
//
// LEPOPIIRTO: kaikki on tapahtumaohjattua. Herätysanimaatio on kehysajo (Ruudunpaivitys.Herata joka askeleella), joka
// päättyy lopputilaan ja pysähtyy; levossa mikään ei kirjoita tyyliä (arvot asetetaan vain muuttuneina).
// Testikomennot: ui muste heraa <ISO:tunnus> [l/k] | valmis <ISO> | salaisuus <ISO:tunnus> | pois | tila (UiKomennot).
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed partial class Kartuscha
    {
        /// <summary>Heränneen maakunnan rivi kartussissa.</summary>
        sealed class MaakuntaRivi
        {
            public string Avain, Nimi;
            public VisualElement El, Kuva, Pisteet;
            public Label NimiTeksti;
            public int Loydetyt = -1, Kaikki = -1;
            /// <summary>Herätys odottaa tai on käynnissä: rivi näkyy alkutilassa (nimi näkymätön, leima poissa).</summary>
            public bool Heraa;
        }

        const int MaakuntiaRiveina = 3, PisteitaEnintaan = 10;
        const float NimiKesto = 1.2f, LeimaKesto = 0.3f;

        VisualElement muste, mkRivit;
        Label maakunnatArvo, nostotArvo;
        VisualElement maakunnatPalkki, nostotPalkki;
        Button salaisuusNappi;
        readonly Dictionary<string, MaakuntaRivi> mkRivi = new Dictionary<string, MaakuntaRivi>();
        /// <summary>Tämän istunnon heräämiset, tuorein ensin (rivijärjestys).</summary>
        readonly List<string> tuoreet = new List<string>();
        readonly List<string> heraaJono = new List<string>();
        IVisualElementScheduledItem heraaAjo;
        /// <summary>Rivi, jonka herätys on käynnissä (muut jonossa olevat odottavat alkutilassa).</summary>
        string heraaAvain;
        PeliOhjain kuunneltu;
        /// <summary>Maakunta → salaisuuden valo-id (MaakuntaValmis-tapahtumasta tai kokoelmasta maakuntasalaisuudet).</summary>
        readonly Dictionary<string, string> salaisuudet = new Dictionary<string, string>();
        readonly Dictionary<string, string> salaisuusNimet = new Dictionary<string, string>();
        readonly HashSet<string> salaisuusHaussa = new HashSet<string>();
        string naytettySalaisuus;

        // Testikomennot (ui muste): laskurit ja valmiit maat ilman peliä.
        readonly Dictionary<string, (int Loydetyt, int Kaikki)> testiLaskurit = new Dictionary<string, (int, int)>();
        readonly HashSet<string> testiValmiit = new HashSet<string>();
        string testiSalaisuus;

        // Löydös 144 + Elävä kartta: lippu liehuu vain valmiissa maassa.
        Texture2D lippuKuva;
        float lippuLeveys;
        bool lippuLiehuu;

        /// <summary>Kartussin maa (pelaajan maa tai testimaa) tai null.</summary>
        public string Maa => iso;

        /// <summary>Kartan käsialanimille (MaakuntanimetKartalla): maakunta heräsi (animoi = kirjoitus 1,2 s).</summary>
        public event System.Action<string> MaakuntaHerasi;
        /// <summary>Heränneiden joukko tai maa vaihtui: kartan nimet synkronoidaan.</summary>
        public event System.Action MusteMuuttui;

        void RakennaMuste()
        {
            muste = Rakenne.El("mk-kartuscha__muste", null, PickingMode.Ignore);
            sisus.Insert(0, muste);
            muste.style.display = DisplayStyle.None;
            (maakunnatArvo, maakunnatPalkki) = MusteRivi("MAAKUNNAT");
            (nostotArvo, nostotPalkki) = MusteRivi("NOSTOT");
            mkRivit = Rakenne.El("mk-kartuscha__maakunnat", muste, PickingMode.Ignore);

            // Salaisuusrivi masto-osan alle: näkyy kiinni ja auki (pieni ilmoitus, ei ponnahdusta).
            salaisuusNappi = Rakenne.Nappi(null, "mk-kartuscha__salaisuus", AvaaSalaisuus);
            kortti.Insert(kortti.IndexOf(masto) + 1, salaisuusNappi);
            Kirjasimet.Aseta(Rakenne.Teksti("", "mk-kartuscha__salaisuusteksti", salaisuusNappi), Kirjasin.LukuKursiivi);
            salaisuusNappi.style.display = DisplayStyle.None;
            MaakuntaTiedot.Lataa(null);
        }

        (Label Arvo, VisualElement Palkki) MusteRivi(string nimike)
        {
            var r = Rakenne.El("mk-kartuscha__rivi", muste, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti(nimike, "mk-kartuscha__nimike", r), Kirjasin.Kone);
            var arvo = Rakenne.Teksti("", "mk-kartuscha__arvo", r);
            Kirjasimet.Aseta(arvo, Kirjasin.Kone);
            var raita = Rakenne.El("mk-kartuscha__vertailu", r, PickingMode.Ignore);
            var viiva = new Pisteviiva();
            viiva.AddToClassList("mk-kartuscha__vertailuraita");
            raita.Add(viiva);
            var palkki = Rakenne.El("mk-kartuscha__vertailupalkki", raita, PickingMode.Ignore);
            return (arvo, palkki);
        }

        /// <summary>PeliOhjain voi vaihtua (uusi peli, lataus): tapahtumat kytketään uudelleen (Seuraa, 400 ms).</summary>
        void KytkeMuste()
        {
            var o = PeliOhjain.Instanssi;
            if (o == kuunneltu) return;
            if (kuunneltu != null)
            {
                kuunneltu.NostoLoytyi -= Loytyi;
                kuunneltu.MaakuntaHeraa -= Heraa;
                kuunneltu.MaakuntaValmis -= Valmis;
                kuunneltu.MusteValmis -= PaivitaMuste;
            }
            kuunneltu = o;
            if (o != null)
            {
                o.NostoLoytyi += Loytyi;
                o.MaakuntaHeraa += Heraa;
                o.MaakuntaValmis += Valmis;
                o.MusteValmis += PaivitaMuste;
            }
            PaivitaMuste();
        }

        void Loytyi(MusteLoyto t) => PaivitaMuste();

        static bool NostokorttiAuki => UiNakymat.Hae()?.Nostokortti?.Auki == true;

        /// <summary>Seuraa (400 ms): odottava herätys käyntiin, kun kortti on auki eikä nostokortti peitä sitä.</summary>
        void OdottavaHeraaminen()
        {
            if (heraaAjo == null && heraaJono.Count > 0 && auki && !NostokorttiAuki && Rakenne.Naytetaan(kortti)) JatkaHeraamista(0);
        }

        void Heraa(string maakunta) => Heraa(maakunta, true);

        void Heraa(string maakunta, bool animoi)
        {
            if (string.IsNullOrEmpty(maakunta)) return;
            tuoreet.Remove(maakunta);
            tuoreet.Insert(0, maakunta);
            if (animoi && !LinssiUi.VahennettyLiike() && !heraaJono.Contains(maakunta)) heraaJono.Add(maakunta);
            PaivitaMuste();
            MaakuntaHerasi?.Invoke(maakunta);
            if (auki && Rakenne.Naytetaan(kortti)) JatkaHeraamista(0);
        }

        void Valmis(string maakunta, string salaisuusId)
        {
            if (!string.IsNullOrEmpty(maakunta) && !string.IsNullOrEmpty(salaisuusId)) salaisuudet[maakunta] = salaisuusId;
            PaivitaMuste();
        }

        /// <summary>Maan maakunnat laskureineen: pelin data + testikomentojen ohitukset.</summary>
        public List<(string Maakunta, int Loydetyt, int Kaikki)> Laskurit(string maa)
        {
            var tulos = new List<(string, int, int)>();
            if (string.IsNullOrEmpty(maa)) return tulos;
            var o = PeliOhjain.Instanssi;
            if (o != null && o.MusteLuettu) tulos.AddRange(o.MusteMaakunnat(maa));
            string etu = maa + ":";
            foreach (var kv in testiLaskurit)
            {
                if (!kv.Key.StartsWith(etu, System.StringComparison.Ordinal)) continue;
                int i = tulos.FindIndex(x => x.Item1 == kv.Key);
                if (i >= 0) tulos[i] = (kv.Key, kv.Value.Loydetyt, kv.Value.Kaikki);
                else tulos.Add((kv.Key, kv.Value.Loydetyt, kv.Value.Kaikki));
            }
            return tulos;
        }

        bool MaaValmis(string maa)
        {
            if (maa == null) return false;
            if (testiValmiit.Contains(maa)) return true;
            var l = Laskurit(maa).Where(x => x.Kaikki > 0).ToList();
            return l.Count > 0 && l.All(x => x.Loydetyt >= x.Kaikki);
        }

        /// <summary>Tapahtumasta, maan vaihtuessa ja testikomennoista: laskurit, rivit, salaisuus ja lippu.</summary>
        void PaivitaMuste()
        {
            if (muste == null) return;
            var l = iso != null ? Laskurit(iso) : new List<(string Maakunta, int Loydetyt, int Kaikki)>();
            var maakunnat = l.Where(x => x.Kaikki > 0).ToList();
            bool nakyy = maakunnat.Count > 0;
            if (muste.style.display != (nakyy ? DisplayStyle.Flex : DisplayStyle.None)) muste.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            if (nakyy)
            {
                int heranneet = maakunnat.Count(x => x.Loydetyt > 0), loydetyt = maakunnat.Sum(x => x.Loydetyt), kaikki = maakunnat.Sum(x => x.Kaikki);
                AsetaTeksti(maakunnatArvo, $"{heranneet}/{maakunnat.Count}");
                AsetaTeksti(nostotArvo, $"{loydetyt}/{kaikki}");
                AsetaPalkki(maakunnatPalkki, (float)heranneet / maakunnat.Count);
                AsetaPalkki(nostotPalkki, kaikki > 0 ? (float)loydetyt / kaikki : 0f);
            }
            PaivitaRivit(nakyy ? maakunnat : new List<(string Maakunta, int Loydetyt, int Kaikki)>());
            PaivitaSalaisuus(l);
            PaivitaLippu();
            MusteMuuttui?.Invoke();
        }

        static void AsetaTeksti(Label l, string t) { if (l.text != t) l.text = t; }

        static void AsetaPalkki(VisualElement p, float osuus)
        {
            var w = Length.Percent(Mathf.Clamp01(osuus) * 100f);
            if (p.style.width != w) p.style.width = w;
        }

        /// <summary>Heränneet rivit: tuoreet ensin, sitten pisimmällä olevat; enintään MaakuntiaRiveina.</summary>
        void PaivitaRivit(List<(string Maakunta, int Loydetyt, int Kaikki)> maakunnat)
        {
            var valitut = maakunnat.Where(x => x.Loydetyt > 0 || heraaJono.Contains(x.Maakunta))
                .OrderBy(x => { int i = tuoreet.IndexOf(x.Maakunta); return i < 0 ? int.MaxValue : i; })
                .ThenByDescending(x => (float)x.Loydetyt / x.Kaikki)
                .ThenBy(x => x.Maakunta, System.StringComparer.Ordinal)
                .Take(MaakuntiaRiveina).ToList();
            foreach (var vanha in mkRivi.Keys.Where(k => !valitut.Any(v => v.Maakunta == k)).ToList())
            {
                mkRivi[vanha].El.RemoveFromHierarchy();
                mkRivi.Remove(vanha);
            }
            for (int i = 0; i < valitut.Count; i++)
            {
                var (avain, loyd, kaikki) = valitut[i];
                if (!mkRivi.TryGetValue(avain, out var r)) mkRivi[avain] = r = UusiRivi(avain);
                if (mkRivit.IndexOf(r.El) != i) mkRivit.Insert(i, r.El);
                AsetaPisteet(r, Mathf.Max(loyd, heraaJono.Contains(avain) ? 1 : 0), kaikki);
                if (heraaJono.Contains(avain) && avain != heraaAvain) AsetaHeraaminen(r, 0f);
            }
            mkRivit.style.display = valitut.Count > 0 ? DisplayStyle.Flex : DisplayStyle.None;
        }

        MaakuntaRivi UusiRivi(string avain)
        {
            var r = new MaakuntaRivi { Avain = avain, Nimi = MaakuntaTiedot.Nimi(avain) };
            r.El = Rakenne.El("mk-kartuscha__mk", null, PickingMode.Ignore);
            r.Kuva = Rakenne.El("mk-kartuscha__mkkuva", r.El, PickingMode.Ignore);
            r.Kuva.style.display = DisplayStyle.None;
            r.NimiTeksti = Rakenne.Teksti(r.Nimi, "mk-kartuscha__mknimi", r.El);
            Kirjasimet.Aseta(r.NimiTeksti, Kirjasin.Kauno);
            r.Pisteet = Rakenne.El("mk-kartuscha__pisteet", r.El, PickingMode.Ignore);
            // Nimi ja kuva tulevat maakuntadatasta; rivi voi syntyä ennen latausta.
            MaakuntaTiedot.Lataa(() =>
            {
                // Voi tulla synkronisesti ennen kuin rivi on sanakirjassa; irrotettu rivi päivittyy harmittomasti.
                r.Nimi = MaakuntaTiedot.Nimi(avain);
                if (avain != heraaAvain) AsetaTeksti(r.NimiTeksti, r.Heraa ? Kirjoitettu(r.Nimi, 0f) : r.Nimi);
                string kuva = MaakuntaTiedot.Pikkukuva(avain);
                if (kuva == null) return;
                Kuvat.Hae(kuva, t =>
                {
                    if (t == null) return;
                    r.Kuva.style.backgroundImage = new StyleBackground(t);
                    r.Kuva.style.display = DisplayStyle.Flex;
                });
            });
            return r;
        }

        /// <summary>Mustepisteet (täytetyt / tyhjät, enintään 10) tai luku "3/27".</summary>
        static void AsetaPisteet(MaakuntaRivi r, int loydetyt, int kaikki)
        {
            if (r.Loydetyt == loydetyt && r.Kaikki == kaikki) return;
            r.Loydetyt = loydetyt;
            r.Kaikki = kaikki;
            r.Pisteet.Clear();
            r.Pisteet.tooltip = $"{loydetyt}/{kaikki}";
            if (kaikki > PisteitaEnintaan)
            {
                Kirjasimet.Aseta(Rakenne.Teksti($"{loydetyt}/{kaikki}", "mk-kartuscha__pisteluku", r.Pisteet), Kirjasin.Kone);
                return;
            }
            for (int i = 0; i < kaikki; i++)
                Rakenne.El(i < loydetyt ? "mk-kartuscha__piste mk-kartuscha__piste--taysi" : "mk-kartuscha__piste", r.Pisteet, PickingMode.Ignore);
        }

        // --- herätysanimaatio ------------------------------------------------------------------------

        static float EaseOut(float t) { t = Mathf.Clamp01(t); float y = 1f - t; return 1f - y * y * y; }

        /// <summary>Nimi kirjoitettuna osuuteen: loput merkit näkymättöminä, jotta rivin leveys ei elä kirjoittaessa.</summary>
        static string Kirjoitettu(string nimi, float osuus)
        {
            int n = Mathf.Clamp(Mathf.FloorToInt(nimi.Length * Mathf.Clamp01(osuus) + 0.0001f), 0, nimi.Length);
            return n >= nimi.Length ? nimi : nimi.Substring(0, n) + "<alpha=#00>" + nimi.Substring(n);
        }

        /// <summary>Rivi hetkeen t (s herätyksen alusta): nimi 0–1,2 s, leima ja pisteet 1,2–1,5 s.</summary>
        static void AsetaHeraaminen(MaakuntaRivi r, float t)
        {
            r.Heraa = t < NimiKesto + LeimaKesto;
            AsetaTeksti(r.NimiTeksti, Kirjoitettu(r.Nimi, t / NimiKesto));
            float s = EaseOut((t - NimiKesto) / LeimaKesto);
            float skaala = Mathf.Lerp(1.3f, 1f, s), kulma = Mathf.Lerp(-6f, -2f, s);
            if (r.Heraa)
            {
                r.Kuva.style.scale = new Scale(new Vector3(skaala, skaala, 1f));
                r.Kuva.style.rotate = new Rotate(kulma);
                r.Kuva.style.opacity = s;
                r.Pisteet.style.opacity = s;
            }
            else
            {
                // Lopputila USS:n arvoihin (kierto −2°), ei jäänteitä inline-tyyleihin.
                r.Kuva.style.scale = StyleKeyword.Null;
                r.Kuva.style.rotate = StyleKeyword.Null;
                r.Kuva.style.opacity = StyleKeyword.Null;
                r.Pisteet.style.opacity = StyleKeyword.Null;
            }
        }

        /// <summary>Avauksen tai tapahtuman jälkeen: jonon seuraava herätys (yksi kerrallaan).</summary>
        void JatkaHeraamista(long viiveMs)
        {
            if (heraaAjo != null || heraaJono.Count == 0) return;
            // Nostokortti on kartussin päällä (löytö syntyy kortin avauksesta): herätys odottaa kortin sulkemista (Seuraa).
            if (NostokorttiAuki) return;
            if (viiveMs > 0) { kortti.schedule.Execute(() => JatkaHeraamista(0)).StartingIn(viiveMs); return; }
            string avain = heraaJono[0];
            if (!mkRivi.TryGetValue(avain, out var r))
            {
                // Rivi ei ole tämän maan (maa vaihtui) tai jäi rajan ulkopuolelle: herätys raukeaa.
                heraaJono.RemoveAt(0);
                JatkaHeraamista(0);
                return;
            }
            float alku = Time.unscaledTime;
            heraaAvain = avain;
            AsetaHeraaminen(r, 0f);
            heraaAjo = kortti.schedule.Execute(() =>
            {
                float t = Time.unscaledTime - alku;
                // Kortti kiinni tai piilossa: suoraan lopputilaan, ajo seis (ei pyöritä näkymättömänä).
                bool valmis = t >= NimiKesto + LeimaKesto || !auki || !Rakenne.Naytetaan(kortti);
                if (!valmis) Ruudunpaivitys.Herata(0.1f);
                AsetaHeraaminen(r, valmis ? NimiKesto + LeimaKesto : t);
                if (!valmis) return;
                heraaAjo?.Pause();
                heraaAjo = null;
                heraaAvain = null;
                heraaJono.Remove(avain);
                PaivitaMuste();
                if (auki) JatkaHeraamista(150);
            }).Every(16);
        }

        // --- salaisuus ------------------------------------------------------------------------------

        /// <summary>
        /// Valmiin maakunnan salaisuus, jota ei ole vielä avattu → rivi näkyviin. Id tapahtumasta tai kokoelmasta
        /// (haku kerran maakuntaa kohden); testikomennossa rivi näkyy avauksesta riippumatta.
        /// </summary>
        void PaivitaSalaisuus(List<(string Maakunta, int Loydetyt, int Kaikki)> laskurit)
        {
            string loytyi = null;
            var o = PeliOhjain.Instanssi;
            var ehdokkaat = laskurit.Where(x => x.Kaikki > 0 && x.Loydetyt >= x.Kaikki).Select(x => x.Maakunta).ToList();
            if (testiSalaisuus != null && iso != null && testiSalaisuus.StartsWith(iso + ":", System.StringComparison.Ordinal)) ehdokkaat.Insert(0, testiSalaisuus);
            foreach (var m in ehdokkaat)
            {
                if (!salaisuudet.ContainsKey(m)) HaeSalaisuus(m);
                if (!salaisuudet.TryGetValue(m, out var id) || id == null) continue;
                bool avattu = m != testiSalaisuus && o != null && o.MusteLuettu && o.NostonMuste(id).Loydetty;
                if (!avattu) { loytyi = m; break; }
            }
            naytettySalaisuus = loytyi;
            bool nakyy = loytyi != null;
            if (nakyy)
            {
                salaisuusNimet.TryGetValue(loytyi, out var nimi);
                AsetaTeksti(salaisuusNappi.Q<Label>(), $"Maakunnan salaisuus löytyi: {nimi ?? MaakuntaTiedot.Nimi(loytyi)} ›");
            }
            var d = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            if (salaisuusNappi.style.display != d) salaisuusNappi.style.display = d;
        }

        void HaeSalaisuus(string maakunta)
        {
            if (!salaisuusHaussa.Add(maakunta)) return;
            UiKerros.Hae().StartCoroutine(NostoSisalto.MaakunnanSalaisuus(maakunta, (id, nimi) =>
            {
                salaisuusHaussa.Remove(maakunta);
                if (!salaisuudet.ContainsKey(maakunta) || salaisuudet[maakunta] == null) salaisuudet[maakunta] = id;
                if (nimi != null) salaisuusNimet[maakunta] = nimi;
                // Seuraavalla kierroksella: välimuistista vastaus tulee synkronisesti PaivitaSalaisuuden sisältä.
                kortti.schedule.Execute(PaivitaMuste);
            }));
        }

        void AvaaSalaisuus()
        {
            if (naytettySalaisuus == null || !salaisuudet.TryGetValue(naytettySalaisuus, out var id) || id == null) return;
            if (naytettySalaisuus == testiSalaisuus) testiSalaisuus = null;
            // Kortti kirjaa löydön (NostoAvattu) → NostoLoytyi → rivi poistuu.
            UiNakymat.Hae()?.Nostokortti.Avaa(id);
            PaivitaMuste();
        }

        // --- lippu ----------------------------------------------------------------------------------

        /// <summary>Lippu liehuu vain valmiissa maassa (Liput.Aaltoile); muuten staattinen kuva ilman aaltoa.</summary>
        void PaivitaLippu()
        {
            if (lippuKuva == null) return;
            bool liehuu = MaaValmis(iso);
            if (liehuu == lippuLiehuu && (liehuu ? aalto != null : lippu.style.backgroundImage.value.texture == lippuKuva)) return;
            lippuLiehuu = liehuu;
            if (liehuu) { VapautaAalto(); AsetaLippu(lippuKuva, lippuLeveys, 18f); }
            else { VapautaAalto(); lippu.style.backgroundImage = new StyleBackground(lippuKuva); }
        }

        // --- testi ----------------------------------------------------------------------------------

        /// <summary>
        /// ui muste: heraa &lt;ISO:tunnus&gt; [l/k] | valmis &lt;ISO&gt; | salaisuus &lt;ISO:tunnus&gt; | pois | tila.
        /// Kartussi avataan maalle (testimaa, kun pelaajan maa on eri) ja animaatiot ajetaan ilman peliä.
        /// </summary>
        public string MusteTesti(string alikomento, string arvo)
        {
            // Viimeinen sana "l/k" = laskuri (heraa); muu on maakunnan tunnus välilyönteineen.
            string lisa = null;
            if (arvo != null)
            {
                int v = arvo.LastIndexOf(' ');
                string loppu = v > 0 ? arvo.Substring(v + 1) : null;
                if (loppu != null && System.Text.RegularExpressions.Regex.IsMatch(loppu, @"^\d+/\d+$")) { lisa = loppu; arvo = arvo.Substring(0, v).Trim(); }
            }
            switch (alikomento)
            {
                case "heraa":
                {
                    if (string.IsNullOrEmpty(arvo) || arvo.IndexOf(':') <= 0) return "ui muste heraa <ISO:tunnus> [l/k]";
                    string maa = arvo.Substring(0, arvo.IndexOf(':')).ToUpperInvariant();
                    string avain = maa + arvo.Substring(arvo.IndexOf(':'));
                    int k = Laskurit(maa).FirstOrDefault(x => x.Maakunta == avain).Kaikki;
                    int l = 1;
                    if (lisa != null && lisa.Contains("/"))
                    {
                        int.TryParse(lisa.Split('/')[0], out l);
                        int.TryParse(lisa.Split('/')[1], out k);
                    }
                    testiLaskurit[avain] = (Mathf.Max(1, l), k > 0 ? k : 7);
                    if (iso == maa)
                    {
                        Heraa(avain, true);
                        if (!auki) Avaa();
                    }
                    else
                    {
                        // Maa vaihtuu testimaaksi; herätys jonoon ennen Tayta-kutsua, avaus ajaa sen.
                        if (!LinssiUi.VahennettyLiike() && !heraaJono.Contains(avain)) heraaJono.Add(avain);
                        tuoreet.Remove(avain);
                        tuoreet.Insert(0, avain);
                        Testaa(maa, true);
                        UiSisalto.Lataa(() => MaakuntaHerasi?.Invoke(avain));
                    }
                    return null;
                }
                case "valmis":
                    if (string.IsNullOrEmpty(arvo)) return "ui muste valmis <ISO>";
                    testiValmiit.Add(arvo.ToUpperInvariant());
                    PaivitaMuste();
                    return "lippu " + (iso == arvo.ToUpperInvariant() ? (lippuLiehuu ? "liehuu" : "ei vielä ladattu") : "liehuu, kun kartussi näyttää maan " + arvo.ToUpperInvariant());
                case "salaisuus":
                    if (string.IsNullOrEmpty(arvo) || arvo.IndexOf(':') <= 0) return "ui muste salaisuus <ISO:tunnus>";
                    testiSalaisuus = arvo.Substring(0, arvo.IndexOf(':')).ToUpperInvariant() + arvo.Substring(arvo.IndexOf(':'));
                    PaivitaMuste();
                    return null;
                case "pois":
                    testiLaskurit.Clear();
                    testiValmiit.Clear();
                    testiSalaisuus = null;
                    heraaJono.Clear();
                    PaivitaMuste();
                    return null;
                case "tila":
                case "":
                case null:
                {
                    var l = Laskurit(iso);
                    return $"{iso ?? "ei maata"}: {l.Count(x => x.Loydetyt > 0)}/{l.Count(x => x.Kaikki > 0)} maakuntaa, "
                         + $"nostot {l.Sum(x => x.Loydetyt)}/{l.Sum(x => x.Kaikki)}, rivit [{string.Join(", ", mkRivi.Values.Select(r => r.Nimi + " " + r.Loydetyt + "/" + r.Kaikki))}], "
                         + $"lippu {(lippuLiehuu ? "liehuu" : "staattinen")}, salaisuus {naytettySalaisuus ?? "-"}, jonossa {heraaJono.Count}";
                }
            }
            return "ui muste heraa <ISO:tunnus> [l/k] | valmis <ISO> | salaisuus <ISO:tunnus> | pois | tila";
        }
    }
}
