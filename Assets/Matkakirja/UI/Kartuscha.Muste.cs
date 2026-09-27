// KARTUSSI JA ISOISÄN MUSTE (Natiivi-UI, ELÄVÄ KARTTA; omistaja hyväksyi videon 26.9.2026 → pelattava build 19).
// Pelilogiikka ja tapahtumat ovat Pelikoodarin (PeliOhjain.Muste.cs, Peli/KarttaMuste.cs); tämä vain näyttää ne.
//
// MAAKUNTAERÄ (omistaja 27.9.2026 klo 08.3x, Pelikoodarin speksi 7041fd0e): kohdemaan kaikki maakunnat ovat heränneinä
// heti, eikä heräämistä tai maakunnan valmistumista enää näytetä: ei nimen kirjoitusta eikä leimaa, ei MAAKUNNAT-palkkia
// (aina täysi), ei "Maakunnan salaisuus löytyi" -riviä. Salaisuus-nosto näkyy kartalla kuten muut ja kuuluu laskuriin.
//
// Avattu kartussi, ylimpänä (piilossa, kun maalla ei ole maakuntanostoja):
//      NOSTOT      1/97   ▬─────────         löydetyt nostot / kaikki (salaisuudet mukana)
//      [kuva] Attiki                ●○○○○○○  maakunnat (tuoreimmat löydöt ensin, sitten pisimmällä olevat, enintään 3):
//                                            pikkukuva leimana, käsialanimi (Kirjasin.Kauno), mustepisteet löydetyt/kaikki
// Maa valmis (kaikkien maakuntien Loydetyt == Kaikki) → lippu liehuu (löydös 144, Liput.Aaltoile); muuten staattinen kuva.
//
// LEPOPIIRTO: kaikki on tapahtumaohjattua; levossa mikään ei kirjoita tyyliä (arvot asetetaan vain muuttuneina).
// Testikomennot: ui muste laskuri <ISO:tunnus> [l/k] | valmis <ISO> | pois | tila (UiKomennot).
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed partial class Kartuscha
    {
        /// <summary>Maakunnan rivi kartussissa.</summary>
        sealed class MaakuntaRivi
        {
            public string Avain, Nimi;
            public VisualElement El, Kuva, Pisteet;
            public Label NimiTeksti;
            public int Loydetyt = -1, Kaikki = -1;
        }

        const int MaakuntiaRiveina = 3, PisteitaEnintaan = 10;

        VisualElement muste, mkRivit;
        Label nostotArvo;
        VisualElement nostotPalkki;
        readonly Dictionary<string, MaakuntaRivi> mkRivi = new Dictionary<string, MaakuntaRivi>();
        /// <summary>Tämän istunnon löydöt maakunnittain, tuorein ensin (rivijärjestys).</summary>
        readonly List<string> tuoreet = new List<string>();
        PeliOhjain kuunneltu;

        // Testikomennot (ui muste): laskurit ja valmiit maat ilman peliä.
        readonly Dictionary<string, (int Loydetyt, int Kaikki)> testiLaskurit = new Dictionary<string, (int, int)>();
        readonly HashSet<string> testiValmiit = new HashSet<string>();

        // Löydös 144 + Elävä kartta: lippu liehuu vain valmiissa maassa.
        Texture2D lippuKuva;
        float lippuLeveys;
        bool lippuLiehuu;

        /// <summary>Kartussin maa (pelaajan maa tai testimaa) tai null.</summary>
        public string Maa => iso;

        /// <summary>Laskurit tai maa vaihtui: kartan käsialanimet synkronoidaan (MaakuntanimetKartalla).</summary>
        public event System.Action MusteMuuttui;

        void RakennaMuste()
        {
            muste = Rakenne.El("mk-kartuscha__muste", null, PickingMode.Ignore);
            sisus.Insert(0, muste);
            muste.style.display = DisplayStyle.None;
            (nostotArvo, nostotPalkki) = MusteRivi("NOSTOT");
            mkRivit = Rakenne.El("mk-kartuscha__maakunnat", muste, PickingMode.Ignore);
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
                kuunneltu.MusteValmis -= PaivitaMuste;
            }
            kuunneltu = o;
            if (o != null)
            {
                o.NostoLoytyi += Loytyi;
                o.MusteValmis += PaivitaMuste;
            }
            PaivitaMuste();
        }

        void Loytyi(MusteLoyto t)
        {
            if (!string.IsNullOrEmpty(t.Maakunta)) { tuoreet.Remove(t.Maakunta); tuoreet.Insert(0, t.Maakunta); }
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

        /// <summary>Tapahtumasta, maan vaihtuessa ja testikomennoista: laskuri, rivit ja lippu.</summary>
        void PaivitaMuste()
        {
            if (muste == null) return;
            var l = iso != null ? Laskurit(iso) : new List<(string Maakunta, int Loydetyt, int Kaikki)>();
            var maakunnat = l.Where(x => x.Kaikki > 0).ToList();
            bool nakyy = maakunnat.Count > 0;
            if (muste.style.display != (nakyy ? DisplayStyle.Flex : DisplayStyle.None)) muste.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            if (nakyy)
            {
                int loydetyt = maakunnat.Sum(x => x.Loydetyt), kaikki = maakunnat.Sum(x => x.Kaikki);
                AsetaTeksti(nostotArvo, $"{loydetyt}/{kaikki}");
                AsetaPalkki(nostotPalkki, kaikki > 0 ? (float)loydetyt / kaikki : 0f);
            }
            PaivitaRivit(nakyy ? maakunnat : new List<(string Maakunta, int Loydetyt, int Kaikki)>());
            PaivitaLippu();
            MusteMuuttui?.Invoke();
        }

        static void AsetaTeksti(Label l, string t) { if (l.text != t) l.text = t; }

        static void AsetaPalkki(VisualElement p, float osuus)
        {
            var w = Length.Percent(Mathf.Clamp01(osuus) * 100f);
            if (p.style.width != w) p.style.width = w;
        }

        /// <summary>Maakuntarivit (kaikki heränneitä): tuoreet löydöt ensin, sitten pisimmällä olevat; enintään MaakuntiaRiveina.</summary>
        void PaivitaRivit(List<(string Maakunta, int Loydetyt, int Kaikki)> maakunnat)
        {
            var valitut = maakunnat
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
                AsetaPisteet(r, loyd, kaikki);
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
                AsetaTeksti(r.NimiTeksti, r.Nimi);
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
        /// ui muste: laskuri &lt;ISO:tunnus&gt; [l/k] | valmis &lt;ISO&gt; | pois | tila. Kartussi avataan maalle (testimaa,
        /// kun pelaajan maa on eri). Herätys, maakunnan valmistuminen ja salaisuusrivi poistuivat (maakuntaerä 27.9.).
        /// </summary>
        public string MusteTesti(string alikomento, string arvo)
        {
            // Viimeinen sana "l/k" = laskuri; muu on maakunnan tunnus välilyönteineen.
            string lisa = null;
            if (arvo != null)
            {
                int v = arvo.LastIndexOf(' ');
                string loppu = v > 0 ? arvo.Substring(v + 1) : null;
                if (loppu != null && System.Text.RegularExpressions.Regex.IsMatch(loppu, @"^\d+/\d+$")) { lisa = loppu; arvo = arvo.Substring(0, v).Trim(); }
            }
            switch (alikomento)
            {
                case "laskuri":
                {
                    if (string.IsNullOrEmpty(arvo) || arvo.IndexOf(':') <= 0) return "ui muste laskuri <ISO:tunnus> [l/k]";
                    string maa = arvo.Substring(0, arvo.IndexOf(':')).ToUpperInvariant();
                    string avain = maa + arvo.Substring(arvo.IndexOf(':'));
                    int k = Laskurit(maa).FirstOrDefault(x => x.Maakunta == avain).Kaikki;
                    int l = 1;
                    if (lisa != null && lisa.Contains("/"))
                    {
                        int.TryParse(lisa.Split('/')[0], out l);
                        int.TryParse(lisa.Split('/')[1], out k);
                    }
                    testiLaskurit[avain] = (Mathf.Max(0, l), k > 0 ? k : 7);
                    tuoreet.Remove(avain);
                    tuoreet.Insert(0, avain);
                    if (iso == maa) { PaivitaMuste(); if (!auki) Avaa(); }
                    else Testaa(maa, true);
                    return null;
                }
                case "heraa":
                case "salaisuus":
                    return "poistettu (maakuntaerä 27.9.: maakunnat heränneinä heti, ei salaisuusriviä)";
                case "valmis":
                    if (string.IsNullOrEmpty(arvo)) return "ui muste valmis <ISO>";
                    testiValmiit.Add(arvo.ToUpperInvariant());
                    PaivitaMuste();
                    return "lippu " + (iso == arvo.ToUpperInvariant() ? (lippuLiehuu ? "liehuu" : "ei vielä ladattu") : "liehuu, kun kartussi näyttää maan " + arvo.ToUpperInvariant());
                case "pois":
                    testiLaskurit.Clear();
                    testiValmiit.Clear();
                    PaivitaMuste();
                    return null;
                case "tila":
                case "":
                case null:
                {
                    var l = Laskurit(iso);
                    return $"{iso ?? "ei maata"}: {l.Count(x => x.Kaikki > 0)} maakuntaa, "
                         + $"nostot {l.Sum(x => x.Loydetyt)}/{l.Sum(x => x.Kaikki)}, rivit [{string.Join(", ", mkRivi.Values.Select(r => r.Nimi + " " + r.Loydetyt + "/" + r.Kaikki))}], "
                         + $"lippu {(lippuLiehuu ? "liehuu" : "staattinen")}";
                }
            }
            return "ui muste laskuri <ISO:tunnus> [l/k] | valmis <ISO> | pois | tila";
        }
    }
}
