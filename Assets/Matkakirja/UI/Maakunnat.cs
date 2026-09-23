// KARTTASELITTEEN MAAKUNNAT-VÄLILEHTI (Natiivi-UI): webin js/karttatyokalu-maakunnat.js
// natiivina (omistajan päätös 22.9.2026): Aarnin luettelon maiden nykyiset
// hallinnolliset alueet maittain ja Livian luonnehdinta kustakin.
//
//   Lista      maaotsikko (▸, yksi maa auki kerrallaan) + rivi per alue; rivin
//              napautus valitsee (valinta muistetaan: PlayerPrefs
//              matkakirja-karttatyokalu-maakunta, avain "ISO:tunnus").
//              Oletuksena auki pelaajan nykyinen maa, muuten Ranska.
//   Luonnehdinta  listan alla kiinteänä: nimi, lyhyt teksti ja ⊕ → kortti.
//   Kortti     kuvat (1–2 rinnakkain, useampi vaakavieritteenä, lähderivi),
//              pitkä teksti ja Pulun kysymykset (yksi vastaus auki kerrallaan).
//
// Data sisältöpaketista (LinssiSisalto-reitti, sama välimuisti):
//   moduulit/js/karttatyokalu-maakunnat.json  MAAKUNTIEN_NIMET, MAAKUNTIEN_MAAT
//   moduulit/js/packs/maakunnat-luonnehdinnat.json  { lyhyt, pitka, kuva }
//   moduulit/js/packs/maakunnat-pulu.json  [{ q, a }]
// Karttakytkentä: Maakunnat.Valittu (avain) — webin ui.karttatyokaluMaakunta;
// värjäys kartalla on Natiivisepän kerros, kun vektoritaso tulee.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Maakunnat
    {
        const string TallennusAvain = "matkakirja-karttatyokalu-maakunta";

        /// <summary>Valinta vaihtui (avain "ISO:tunnus"); kartan värjäys kuuntelee tätä.</summary>
        public static event Action<string> Valittu;
        /// <summary>Nykyinen valinta tai null.</summary>
        public static string ValittuAvain { get; private set; }

        sealed class Maa { public string Iso, Nimi; public List<(string Tunnus, string Nimi)> Alueet = new List<(string, string)>(); }
        sealed class Luonnehdinta { public string Lyhyt, Pitka; public List<Dictionary<string, object>> Kuvat = new List<Dictionary<string, object>>(); }

        readonly UiKerros kerros;
        readonly VisualElement juuri, lista, kuvaus, peukalo;
        readonly ScrollView vieritys;
        readonly Label tila;
        readonly MaakuntaKortti kortti;
        readonly Dictionary<string, Button> rivit = new Dictionary<string, Button>();
        readonly Dictionary<string, (Button Otsikko, VisualElement Rivit)> ryhmat = new Dictionary<string, (Button, VisualElement)>();
        List<Maa> maat;
        Dictionary<string, object> luonnehdinnat, pulu;
        bool haussa, rakennettu;

        public bool KorttiAuki => kortti.Auki;

        public Maakunnat(UiKerros kerros, VisualElement isa)
        {
            this.kerros = kerros;
            juuri = Rakenne.El("mk-maakunnat", isa, PickingMode.Ignore);
            vieritys = new ScrollView(ScrollViewMode.Vertical);
            vieritys.AddToClassList("mk-selite__vieritys");
            vieritys.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            vieritys.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            juuri.Add(vieritys);
            lista = Rakenne.El("mk-maakunnat__lista", vieritys);
            peukalo = Rakenne.El("mk-peukalo mk-peukalo--tyhja", lista, PickingMode.Ignore);
            peukalo.style.display = DisplayStyle.None;
            lista.RegisterCallback<GeometryChangedEvent>(_ => SiirraPeukalo());
            tila = Rakenne.Teksti("Ladataan…", "mk-maakunnat__tila", lista);

            kuvaus = Rakenne.El("mk-maakunnat__luonnehdinta", juuri);
            kuvaus.style.display = DisplayStyle.None;
            kortti = new MaakuntaKortti(kerros);
            ValittuAvain = LueTallennettu();
        }

        /// <summary>Välilehti avattiin: data haetaan ja lista rakennetaan ensimmäisellä kerralla.</summary>
        public void Avautui()
        {
            if (rakennettu || haussa) { if (rakennettu) SiirraPeukalo(); return; }
            haussa = true;
            tila.text = "Ladataan…";
            UiKerros.Hae().StartCoroutine(Lataa());
        }

        public void SuljeKortti() => kortti.Sulje();

        System.Collections.IEnumerator Lataa()
        {
            string nimet = null, luonn = null, kysymykset = null;
            yield return LinssiSisalto.Hae("moduulit/js/karttatyokalu-maakunnat.json", t => nimet = t);
            yield return LinssiSisalto.Hae("moduulit/js/packs/maakunnat-luonnehdinnat.json", t => luonn = t);
            yield return LinssiSisalto.Hae("moduulit/js/packs/maakunnat-pulu.json", t => kysymykset = t);
            haussa = false;
            try
            {
                maat = LueMaat(nimet);
                luonnehdinnat = Viennit(luonn, "MAAKUNTIEN_LUONNEHDINNAT");
                pulu = Viennit(kysymykset, "MAAKUNTIEN_PULU");
            }
            catch (Exception e)
            {
                Debug.LogWarning("MATKAKIRJA ui maakunnat: " + e.Message);
                maat = null;
            }
            if (maat == null || maat.Count == 0)
            {
                tila.text = "Maakuntia ei saatu ladattua.";
                yield break;
            }
            Rakenna();
        }

        static Dictionary<string, object> Ob(object x) => x as Dictionary<string, object>;

        static Dictionary<string, object> Viennit(string json, string nimi)
        {
            if (json == null) return null;
            var v = Ob(MiniJson.Kentta(Ob(MiniJson.Jasenna(json)), "exportit"));
            var x = MiniJson.Kentta(v, nimi);
            // Vientiformaatti voi kääriä arvon ({ arvo: … }).
            if (Ob(x) is Dictionary<string, object> o && o.Count == 1 && o.ContainsKey("arvo")) x = o["arvo"];
            return Ob(x);
        }

        static List<Maa> LueMaat(string json)
        {
            if (json == null) return null;
            var v = Ob(MiniJson.Kentta(Ob(MiniJson.Jasenna(json)), "exportit"));
            var nimet = Ob(MiniJson.Kentta(v, "MAAKUNTIEN_NIMET"));
            var lista = MiniJson.Kentta(v, "MAAKUNTIEN_MAAT") as List<object>;
            if (nimet == null || lista == null) return null;
            var tulos = new List<Maa>();
            foreach (var o in lista.Select(Ob).Where(o => o != null))
            {
                var m = new Maa { Iso = MiniJson.Teksti(o, "iso"), Nimi = MiniJson.Teksti(o, "nimi") };
                if (m.Iso == null) continue;
                // Aineiston järjestys (MiniJson säilyttää avainten järjestyksen kuten webin Object.keys).
                if (Ob(MiniJson.Kentta(nimet, m.Iso)) is Dictionary<string, object> alueet)
                    foreach (var p in alueet) m.Alueet.Add((p.Key, p.Value as string ?? p.Key));
                tulos.Add(m);
            }
            return tulos;
        }

        string Nimi(string avain)
        {
            var (iso, tunnus) = Jaa(avain);
            var m = maat?.FirstOrDefault(x => x.Iso == iso);
            var a = m?.Alueet.FirstOrDefault(x => x.Tunnus == tunnus);
            return a?.Nimi ?? tunnus;
        }

        static (string Iso, string Tunnus) Jaa(string avain)
        {
            int i = avain?.IndexOf(':') ?? -1;
            return i < 0 ? (null, null) : (avain.Substring(0, i), avain.Substring(i + 1));
        }

        bool Kelpaa(string avain) => avain != null && rivit.ContainsKey(avain);

        Luonnehdinta HaeLuonnehdinta(string avain)
        {
            var (iso, tunnus) = Jaa(avain);
            var o = Ob(MiniJson.Kentta(Ob(MiniJson.Kentta(luonnehdinnat, iso ?? "")), tunnus ?? ""));
            if (o == null) return null;
            var l = new Luonnehdinta { Lyhyt = MiniJson.Teksti(o, "lyhyt"), Pitka = MiniJson.Teksti(o, "pitka") };
            // Kuva voi olla yksi olio tai lista (web maakunnanKuvat).
            var k = MiniJson.Kentta(o, "kuva");
            if (Ob(k) is Dictionary<string, object> yksi) l.Kuvat.Add(yksi);
            else if (k is List<object> monta) l.Kuvat.AddRange(monta.Select(Ob).Where(x => x != null));
            return l;
        }

        List<(string Q, string A)> HaePulu(string avain)
        {
            var (iso, tunnus) = Jaa(avain);
            var l = MiniJson.Kentta(Ob(MiniJson.Kentta(pulu, iso ?? "")), tunnus ?? "") as List<object>;
            return l?.Select(Ob).Where(x => x != null)
                .Select(x => (MiniJson.Teksti(x, "q"), MiniJson.Teksti(x, "a")))
                .Where(x => !string.IsNullOrEmpty(x.Item1)).ToList() ?? new List<(string, string)>();
        }

        // --- lista ---------------------------------------------------------------------

        void Rakenna()
        {
            rakennettu = true;
            tila.RemoveFromHierarchy();
            if (ValittuAvain != null && !maat.Any(m => m.Alueet.Any(a => m.Iso + ":" + a.Tunnus == ValittuAvain))) ValittuAvain = null;
            string avoin = ValittuAvain != null ? Jaa(ValittuAvain).Iso : OletusIso();
            foreach (var m in maat)
            {
                var ryhma = Rakenne.El("mk-maakunnat__ryhma", lista, PickingMode.Ignore);
                string iso = m.Iso;
                var otsikko = Rakenne.Nappi(null, "mk-maakunnat__maa", () => VaihdaRyhma(iso), ryhma);
                var nuoli = new SvgIkoni(Ikonit.NuoliOikea);
                nuoli.AddToClassList("mk-maakunnat__nuoli");
                otsikko.Add(nuoli);
                var ot = Rakenne.Teksti((m.Nimi ?? iso).ToUpperInvariant(), "mk-maakunnat__maanimi", otsikko);
                Kirjasimet.Aseta(ot, Kirjasin.Kone);
                var ryhmanRivit = Rakenne.El("mk-maakunnat__rivit", ryhma, PickingMode.Ignore);
                foreach (var a in m.Alueet)
                {
                    string avain = iso + ":" + a.Tunnus;
                    var rivi = Rakenne.Nappi(null, "mk-maakunnat__rivi", () => Valitse(avain), ryhmanRivit);
                    var n = Rakenne.Teksti(a.Nimi, "mk-maakunnat__nimi", rivi);
                    Kirjasimet.Aseta(n, Kirjasin.Luku);
                    rivi.tooltip = a.Nimi;
                    rivit[avain] = rivi;
                }
                ryhmat[iso] = (otsikko, ryhmanRivit);
                AsetaRyhma(iso, iso == avoin);
            }
            if (ValittuAvain != null) rivit[ValittuAvain].AddToClassList("mk-valittu");
            // Peukalo viimeiseksi, jotta se piirtyy rivien päälle.
            peukalo.BringToFront();
            PaivitaLuonnehdinta();
            if (ValittuAvain != null) Valittu?.Invoke(ValittuAvain);
        }

        void AsetaRyhma(string iso, bool auki)
        {
            var r = ryhmat[iso];
            r.Rivit.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
            r.Otsikko.EnableInClassList("mk-auki", auki);
        }

        /// <summary>Vain yksi maa auki kerrallaan (web vaihdaRyhma).</summary>
        void VaihdaRyhma(string iso)
        {
            bool oliAuki = ryhmat[iso].Otsikko.ClassListContains("mk-auki");
            foreach (var muu in ryhmat.Keys.ToList()) AsetaRyhma(muu, !oliAuki && muu == iso);
            if (!oliAuki) vieritys.schedule.Execute(() => vieritys.ScrollTo(ryhmat[iso].Otsikko));
        }

        /// <summary>Pelaajan nykyinen maa, jos se on listalla; muuten Ranska (web oletusIso).</summary>
        string OletusIso()
        {
            string iso = null;
            var o = PeliOhjain.Instanssi;
            if (o != null && o.Matka != null)
            {
                var s = o.Matka.Tila.Pelaaja.Sijainti;
                if (s.Kaupungissa) iso = UiSisalto.Kaupunki(s.Kaupunki)?.Maa;
            }
            return maat.Any(m => m.Iso == iso) ? iso : "FRA";
        }

        public void Valitse(string avain)
        {
            if (!Kelpaa(avain) || avain == ValittuAvain) return;
            if (ValittuAvain != null && rivit.TryGetValue(ValittuAvain, out var vanha)) vanha.RemoveFromClassList("mk-valittu");
            ValittuAvain = avain;
            rivit[avain].AddToClassList("mk-valittu");
            try { PlayerPrefs.SetString(TallennusAvain, avain); PlayerPrefs.Save(); } catch (Exception) { }
            PaivitaLuonnehdinta();
            SiirraPeukalo();
            Valittu?.Invoke(avain);
        }

        static string LueTallennettu()
        {
            var s = PlayerPrefs.GetString(TallennusAvain, null);
            return string.IsNullOrEmpty(s) ? null : s;
        }

        void SiirraPeukalo()
        {
            if (ValittuAvain == null || !rivit.TryGetValue(ValittuAvain, out var r) || r.parent.resolvedStyle.display == DisplayStyle.None
                || float.IsNaN(r.layout.height))
            {
                peukalo.style.display = DisplayStyle.None;
                return;
            }
            peukalo.style.display = DisplayStyle.Flex;
            float yla = r.ChangeCoordinatesTo(lista, Vector2.zero).y;
            peukalo.style.translate = new Translate(0, yla);
            peukalo.style.height = r.layout.height;
        }

        void PaivitaLuonnehdinta()
        {
            kuvaus.Clear();
            if (ValittuAvain == null) { kuvaus.style.display = DisplayStyle.None; return; }
            string avain = ValittuAvain, nimi = Nimi(avain);
            var data = HaeLuonnehdinta(avain);
            kuvaus.style.display = DisplayStyle.Flex;
            var n = Rakenne.Teksti(nimi.ToUpperInvariant(), "mk-maakunnat__lnimi", kuvaus);
            Kirjasimet.Aseta(n, Kirjasin.Kone);
            var rivi = Rakenne.El("mk-maakunnat__lrivi", kuvaus, PickingMode.Ignore);
            var t = Rakenne.Teksti(data?.Lyhyt ?? "Luonnehdinta tulossa.", "mk-maakunnat__lteksti", rivi);
            Kirjasimet.Aseta(t, Kirjasin.Luku);
            if (data != null)
            {
                var lisaa = Rakenne.Nappi(null, "mk-maakunnat__lisaa", () => kortti.Avaa(nimi, data.Pitka ?? data.Lyhyt, data.Kuvat, HaePulu(avain)), rivi, Ikonit.Plus);
                lisaa.tooltip = "Lisää alueesta";
            }
        }

        // --- testi ---------------------------------------------------------------------

        /// <summary>Testikomento: valitse avain ("ISO:tunnus") ja avaa tarvittaessa kortti.</summary>
        public void Testaa(string avain, bool korttiAuki)
        {
            Avautui();
            UiKerros.Hae().StartCoroutine(Odota());
            System.Collections.IEnumerator Odota()
            {
                while (haussa) yield return null;
                if (!rakennettu) yield break;
                if (avain != null && Kelpaa(avain))
                {
                    var iso = Jaa(avain).Iso;
                    foreach (var muu in ryhmat.Keys.ToList()) AsetaRyhma(muu, muu == iso);
                    Valitse(avain);
                }
                if (korttiAuki && ValittuAvain != null)
                {
                    var data = HaeLuonnehdinta(ValittuAvain);
                    if (data != null) kortti.Avaa(Nimi(ValittuAvain), data.Pitka ?? data.Lyhyt, data.Kuvat, HaePulu(ValittuAvain));
                }
            }
        }
    }

    /// <summary>
    /// Alueen kortti (webin .maakunta-kortti): kelluva paperi kevyen himmennyksen päällä,
    /// ✕ ja napautus kortin ohi sulkevat. Valikkokerroksessa (40), pallo lukittu.
    /// </summary>
    public sealed class MaakuntaKortti
    {
        readonly VisualElement himmennys, kortti, kuvat;
        readonly ScrollView sisalto;
        readonly Label otsikko, teksti;
        readonly VisualElement puluLohko;
        (Button Nappi, Label Vastaus) avoinVastaus;
        public bool Auki { get; private set; }

        public MaakuntaKortti(UiKerros kerros)
        {
            himmennys = Rakenne.El("mk-himmennys mk-maakuntaKortti__kerros", kerros.Juuri(UiKerros.Valikot));
            himmennys.style.display = DisplayStyle.None;
            himmennys.RegisterCallback<PointerDownEvent>(e => { if (e.target == himmennys) Sulje(); });
            kortti = Rakenne.El("mk-maakuntaKortti", himmennys);
            var sulje = Rakenne.Nappi("×", "mk-selite__sulje mk-maakuntaKortti__sulje", Sulje, kortti);
            sulje.tooltip = "Sulje";
            sisalto = new ScrollView(ScrollViewMode.Vertical);
            sisalto.AddToClassList("mk-maakuntaKortti__sisalto");
            sisalto.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            sisalto.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            kortti.Add(sisalto);
            sulje.BringToFront();
            otsikko = Rakenne.Teksti("", "mk-maakuntaKortti__otsikko", sisalto);
            Kirjasimet.Aseta(otsikko, Kirjasin.LukuLihava);
            kuvat = Rakenne.El("mk-maakuntaKortti__kuvat", sisalto, PickingMode.Ignore);
            teksti = Rakenne.Teksti("", "mk-maakuntaKortti__teksti", sisalto);
            Kirjasimet.Aseta(teksti, Kirjasin.Luku);
            puluLohko = Rakenne.El("mk-maakuntaKortti__pulu", sisalto, PickingMode.Ignore);
        }

        public void Avaa(string nimi, string pitka, IReadOnlyList<Dictionary<string, object>> kuvalista, IReadOnlyList<(string Q, string A)> kysymykset)
        {
            otsikko.text = nimi;
            teksti.text = pitka ?? "";
            TaytaKuvat(kuvalista);
            TaytaPulu(kysymykset);
            sisalto.scrollOffset = Vector2.zero;
            if (Auki) return;
            Auki = true;
            Rakenne.Nayta(himmennys, true, 220);
            SyoteLukko.Esta(this);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            Rakenne.Nayta(himmennys, false, 220);
            SyoteLukko.Vapauta(this);
        }

        void TaytaKuvat(IReadOnlyList<Dictionary<string, object>> lista)
        {
            kuvat.Clear();
            kuvat.style.display = lista.Count > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            if (lista.Count == 0) return;
            // Kaksi rinnakkain, useampi vaakavieritteeseen (webin karuselli).
            VisualElement isa = kuvat;
            if (lista.Count > 2)
            {
                var v = new ScrollView(ScrollViewMode.Horizontal);
                v.AddToClassList("mk-maakuntaKortti__karuselli");
                v.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
                v.verticalScrollerVisibility = ScrollerVisibility.Hidden;
                kuvat.Add(v);
                isa = v.contentContainer;
                isa.style.flexDirection = FlexDirection.Row;
            }
            foreach (var k in lista)
            {
                var kehys = Rakenne.El("mk-maakuntaKortti__kuva" + (lista.Count > 2 ? " mk-maakuntaKortti__kuva--karuselli" : ""), isa, PickingMode.Ignore);
                var kuva = Rakenne.El("mk-maakuntaKortti__kuvapinta", kehys, PickingMode.Ignore);
                string osoite = MiniJson.Teksti(k, "osoite");
                if (!string.IsNullOrEmpty(osoite))
                    Kuvat.Hae(osoite, t => { if (t != null) kuva.style.backgroundImage = new StyleBackground(t); });
                string lahde = string.Join(" · ", new[] { MiniJson.Teksti(k, "lahde"), MiniJson.Teksti(k, "lisenssi") }.Where(s => !string.IsNullOrEmpty(s)));
                if (lahde.Length > 0)
                {
                    var l = Rakenne.Teksti(lahde, "mk-maakuntaKortti__lahde", kehys);
                    Kirjasimet.Aseta(l, Kirjasin.Kone);
                }
            }
        }

        void TaytaPulu(IReadOnlyList<(string Q, string A)> kysymykset)
        {
            puluLohko.Clear();
            avoinVastaus = default;
            puluLohko.style.display = kysymykset.Count > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            foreach (var (q, a) in kysymykset)
            {
                Button nappi = null;
                nappi = Rakenne.Nappi(null, "mk-maakuntaKortti__kysymys", () => VaihdaVastaus(nappi, a), puluLohko, Ikonit.Puhekupla);
                var t = Rakenne.Teksti(q, "mk-maakuntaKortti__kysymysteksti", nappi);
                Kirjasimet.Aseta(t, Kirjasin.Luku);
            }
        }

        /// <summary>Yksi vastaus kerrallaan; sama napautus sulkee sen.</summary>
        void VaihdaVastaus(Button nappi, string vastaus)
        {
            var edellinen = avoinVastaus;
            if (edellinen.Vastaus != null)
            {
                edellinen.Vastaus.RemoveFromHierarchy();
                edellinen.Nappi.RemoveFromClassList("mk-auki");
                avoinVastaus = default;
                if (edellinen.Nappi == nappi) return;
            }
            var v = Rakenne.Teksti(vastaus ?? "", "mk-maakuntaKortti__vastaus");
            Kirjasimet.Aseta(v, Kirjasin.Luku);
            puluLohko.Insert(puluLohko.IndexOf(nappi) + 1, v);
            nappi.AddToClassList("mk-auki");
            avoinVastaus = (nappi, v);
        }
    }
}
