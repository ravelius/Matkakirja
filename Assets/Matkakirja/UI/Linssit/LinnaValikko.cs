// LINNAN VALIKKO JA PIENOISKARTTA (omistaja 2.10.2026 klo 14.44, Päätoimittajan loki; Natiivi-UI:n pohja
// lokit/natiivi-ui-pohjat/ohjausnappi-ehdotus.md kohta 8; Siirtoseppä): kaikki linnan napit yhteen hampurilaiseen oikeaan
// yläkulmaan ja ‹:n paikalle vasempaan yläkulmaan linnan pienoiskartta.
//
//   nappi    OHJAUSNAPPI (Ohjausnappi.Nappi, Ikonit.Valikko, harmaa 3D:n päällä) ohjausryhmässä turva-alueen sisällä
//   lista    LINSSIN VALIKKO -pohja (.mk-linssivalikko--pohja, LASI): Huoneet › · Esittely uudelleen · Äänet › · Lähteet ·
//            ─ · Sulje linna. Huoneet ja Äänet (ja Lähteet) vaihtavat saman listan alanäkymäksi, jonka ylin rivi ‹ palaa.
//   kartta   Linnanrakentajan kuva (_valmiit/olavinlinna-minikartta/v1 → Resources/Minikartta), 120 × 58 pt, nykyinen huone
//            8 pt:n pisteenä (--tk-korostus, reunus 1,5 pt --tk-pinta, ei hehkua). Koko kartta on yksi osuma: Huoneet-alanäkymä.
//
// Ruudulta pois: ‹ (paluu), ↻ (uusinta), mikserin säätönappi ja linssin ✕ (DioraamaTaulu, MikseriPaneeli.LappuPiilossa,
// LinssiUi.PaivitaSulku). Kuuntele ja Pulu jäävät. Lähteet kootaan tilojen infotauluista ja taulun kohdista (paikkakortin
// lähderivi on pois, omistaja 14.44).
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class LinnaValikko
    {
        enum Nakyma { Paa, Huoneet, Aanet, Lahteet }

        /// <summary>Kaikki linnan ohjaimet (ryhmä ja pienoiskartta); kutsuja näyttää ja piilottaa linnan mukana.</summary>
        public readonly VisualElement Juuri;
        readonly VisualElement ryhma, valikko, kartta, piste;
        readonly Button nappi;
        Nakyma nakyma;
        public bool Auki { get; private set; }

        const string MinikarttaKuva = "Minikartta/olavinlinna-minikartta@3x", MinikarttaTiedot = "Minikartta/olavinlinna-minikartta";
        readonly Dictionary<string, (string Nimi, Vector2 Paikka)> karttaTilat = new Dictionary<string, (string, Vector2)>();

        public LinnaValikko(UiKerros kerros, int kerrosNro)
        {
            Juuri = Rakenne.El("mk-linnavalikko", kerros.Turva(kerrosNro), PickingMode.Ignore);
            Juuri.style.position = Position.Absolute;
            Juuri.style.left = 0; Juuri.style.right = 0; Juuri.style.top = 0; Juuri.style.bottom = 0;
            Juuri.style.display = DisplayStyle.None;

            ryhma = Ohjausnappi.Ryhma(Juuri);
            nappi = Ohjausnappi.Nappi(Ikonit.Valikko, "Valikko", () => { if (Auki) Sulje(); else Avaa(Nakyma.Paa); }, ryhma);

            // Pienoiskartta ‹:n paikalle; tk-teema-lasi antaa pisteen --tk-korostus- ja --tk-pinta-arvot.
            kartta = Rakenne.El("mk-minikartta tk-teema-lasi", Juuri, PickingMode.Position);
            var kuva = Resources.Load<Texture2D>(MinikarttaKuva);
            if (kuva != null) kartta.style.backgroundImage = new StyleBackground(kuva);
            piste = Rakenne.El("mk-minikartta__piste", kartta, PickingMode.Ignore);
            piste.style.display = DisplayStyle.None;
            kartta.RegisterCallback<PointerDownEvent>(e => { Avaa(Nakyma.Huoneet); e.StopPropagation(); });
            kartta.tooltip = "Huoneet";
            LueKartta();

            // Lista kerroksen juureen (ei turvaan), paikka napista kuten LinssiValikko.
            valikko = Rakenne.El("mk-linssivalikko mk-linssivalikko--pohja", kerros.Juuri(kerrosNro));
            valikko.style.display = DisplayStyle.None;
            Kirjasimet.Aseta(valikko, Kirjasin.Luku);
            valikko.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());

            kerros.JokaRuutu += Ruutu;
        }

        void LueKartta()
        {
            var t = Resources.Load<TextAsset>(MinikarttaTiedot);
            if (t == null) return;
            try
            {
                var j = MiniJson.ObjektiTaiNull(MiniJson.Jasenna(t.text));
                var tilat = MiniJson.ObjektiTaiNull(MiniJson.Kentta(j, "tilat"));
                if (tilat == null) return;
                foreach (var kv in tilat)
                {
                    var o = MiniJson.ObjektiTaiNull(kv.Value);
                    if (o == null) continue;
                    karttaTilat[kv.Key] = (MiniJson.Teksti(o, "nimi") ?? kv.Key,
                        new Vector2((float)(MiniJson.Luku(o, "x") ?? 0.5), (float)(MiniJson.Luku(o, "y") ?? 0.5)));
                }
            }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA linna: pienoiskartan tiedot: " + e.Message); }
        }

        /// <summary>Linna auki / kiinni (DioraamaTaulu.Kytke ja Peitetty).</summary>
        public void Nayta(bool nakyy)
        {
            Juuri.style.display = nakyy ? DisplayStyle.Flex : DisplayStyle.None;
            MikseriPaneeli.LappuPiilossa = nakyy;
            if (!nakyy) Sulje();
        }

        void Ruutu()
        {
            if (Juuri.style.display == DisplayStyle.None) return;
            // Nykyinen huone pisteenä (DioraamaAanet.NykyinenHuone = näkymän kohdetila); yleisnäkymässä ei pistettä.
            string huone = DioraamaAanet.NykyinenHuone;
            if (huone != null && karttaTilat.TryGetValue(huone, out var k))
            {
                piste.style.display = DisplayStyle.Flex;
                piste.style.left = Length.Percent(k.Paikka.x * 100f);
                piste.style.top = Length.Percent(k.Paikka.y * 100f);
            }
            else piste.style.display = DisplayStyle.None;
            TarkistaOhiNapautus();
        }

        void Avaa(Nakyma n)
        {
            nakyma = n;
            Rakenna();
            if (!Auki)
            {
                Auki = true;
                Asettele();
                valikko.BringToFront();
                Ponnahdus.Avaa(valikko, origo: new TransformOrigin(Length.Percent(100), Length.Percent(0)));
                nappi.AddToClassList("mk-valittu");
            }
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            Ponnahdus.Sulje(valikko);
            nappi.RemoveFromClassList("mk-valittu");
        }

        void Rakenna()
        {
            valikko.Clear();
            switch (nakyma)
            {
                case Nakyma.Paa:
                    Alanakyma("Huoneet", Nakyma.Huoneet);
                    Komento("Esittely uudelleen", EsittelyUudelleen);
                    Alanakyma("Äänet", Nakyma.Aanet);
                    Alanakyma("Lähteet", Nakyma.Lahteet);
                    Viiva();
                    Komento("Sulje linna", () => UiNakymat.Hae()?.Linssit?.SuljeLinssi());
                    break;
                case Nakyma.Huoneet:
                    Takaisin("Huoneet");
                    string nyt = DioraamaAanet.NykyinenHuone;
                    foreach (var (id, nimi) in Huoneet())
                    {
                        var b = Komento(nimi, () => DioraamaSovitin.PyydaTila(id));
                        b.EnableInClassList("mk-valittu", id == nyt);
                    }
                    break;
                case Nakyma.Aanet:
                    Takaisin("Äänet");
                    Kytkinrivi(Kytkin.Kertoja, "Kertoja");
                    Kytkinrivi(Kytkin.Musiikki, "Taustamusiikki");
                    Kytkinrivi(Kytkin.Aanimaisema, "Äänimaisema");
                    if (Asetukset.Kehittaja && MikseriPaneeli.Viimeisin != null)
                        Komento("Mikseri", () => MikseriPaneeli.Viimeisin.Avaa(true));
                    break;
                case Nakyma.Lahteet:
                    Takaisin("Lähteet");
                    var vieritys = new ScrollView(ScrollViewMode.Vertical)
                    { verticalScrollerVisibility = ScrollerVisibility.Hidden, horizontalScrollerVisibility = ScrollerVisibility.Hidden };
                    vieritys.style.maxHeight = Length.Percent(60);
                    valikko.Add(vieritys);
                    foreach (var l in Lahteet())
                        Kirjasimet.Aseta(Rakenne.Teksti(l, "mk-linssivalikko__lahde", vieritys), Kirjasin.Luku);
                    break;
            }
        }

        /// <summary>Huoneet linnan järjestyksessä: tilat, joilla on infotaulu (ei massaa eikä tunnelmaa).</summary>
        static IEnumerable<(string Id, string Nimi)> Huoneet()
        {
            var r = DioraamaSovitin.Linssi?.Rakennus;
            if (r == null) yield break;
            foreach (var t in r.Tilat)
                if (t.Infotaulu != null) yield return (t.Id, t.Infotaulu.Nimi ?? t.Nimi ?? t.Id);
        }

        /// <summary>Lähteet koottuna (paikkakorttien lähderivit ja taulun kohdat), kukin kerran.</summary>
        static List<string> Lahteet()
        {
            var tulos = new List<string>();
            var r = DioraamaSovitin.Linssi?.Rakennus;
            if (r == null) return tulos;
            void Lisaa(string s)
            {
                if (string.IsNullOrEmpty(s) || s == "TARKISTAMATTA") return;
                foreach (var osa in s.Split(';'))
                {
                    var o = osa.Trim();
                    if (o.Length > 0 && !tulos.Contains(o)) tulos.Add(o);
                }
            }
            foreach (var t in r.Tilat)
                if (t.Infotaulu != null) foreach (var (_, l) in t.Infotaulu.Rivit) Lisaa(l);
            if (r.Taulu != null) foreach (var k in r.Taulu.Kohdat) Lisaa(k.Lahde);
            return tulos;
        }

        static void EsittelyUudelleen()
        {
            // Huoneessa ensin yleisnäkymään (kohdistus katkaisisi kierroksen), sitten kierros alusta seuraavassa ruudussa.
            if (DioraamaAanet.NykyinenHuone != null) DioraamaSovitin.PyydaPaluu();
            UiKerros.Hae().Juuri(LinssiUi.RadioKerros).schedule.Execute(() =>
                DioraamaSovitin.Linssi?.KertojaUudelleen(DioraamaSovitin.ViimeisinT)).StartingIn(150);
        }

        Button Komento(string teksti, Action teko)
        {
            var b = Rakenne.Nappi(teksti, "mk-linssivalikko__kohta mk-linssivalikko__komento", () => { Sulje(); teko(); }, valikko);
            Kirjasimet.Aseta(b, Kirjasin.Luku);
            b.tooltip = teksti;
            return b;
        }

        void Alanakyma(string teksti, Nakyma n)
        {
            var b = Rakenne.Nappi(null, "mk-linssivalikko__kohta mk-linssivalikko__kytkin", () => { nakyma = n; Rakenna(); }, valikko);
            Kirjasimet.Aseta(Rakenne.Teksti(teksti, "mk-linssivalikko__nimi", b), Kirjasin.Luku);
            Kirjasimet.Aseta(Rakenne.Teksti("›", "mk-linssivalikko__tila", b), Kirjasin.KoneBold);
            b.tooltip = teksti;
        }

        void Takaisin(string otsikko)
        {
            var b = Rakenne.Nappi(null, "mk-linssivalikko__kohta mk-linssivalikko__kytkin", () => { nakyma = Nakyma.Paa; Rakenna(); }, valikko);
            Kirjasimet.Aseta(Rakenne.Teksti("‹ " + otsikko, "mk-linssivalikko__nimi", b), Kirjasin.LukuLihava);
            b.tooltip = "Takaisin";
            Viiva();
        }

        void Viiva() => Rakenne.El("mk-linssivalikko__viiva", valikko, PickingMode.Ignore);

        void Kytkinrivi(Kytkin k, string nimi)
        {
            Label tila = null;
            Button b = null;
            void Paivita()
            {
                bool paalla = Asetukset.Paalla(k);
                b.EnableInClassList("mk-valittu", paalla);
                tila.text = paalla ? "PÄÄLLÄ" : "POIS";
                b.tooltip = nimi + ": " + (paalla ? "päällä" : "pois");
            }
            b = Rakenne.Nappi(null, "mk-linssivalikko__kohta mk-linssivalikko__kytkin", () =>
            {
                Asetukset.Aseta(k, !Asetukset.Paalla(k));
                Paivita();
            }, valikko);
            Kirjasimet.Aseta(Rakenne.Teksti(nimi, "mk-linssivalikko__nimi", b), Kirjasin.Luku);
            tila = Rakenne.Teksti("", "mk-linssivalikko__tila", b);
            Kirjasimet.Aseta(tila, Kirjasin.KoneBold);
            Paivita();
        }

        /// <summary>Lista napin alle, oikea reuna napin oikeaan reunaan (LinssiValikko.Asettele).</summary>
        void Asettele()
        {
            var isa = valikko.parent;
            if (isa == null) return;
            var n = nappi.worldBound;
            var yla = isa.WorldToLocal(new Vector2(n.xMax, n.yMax));
            float leveys = isa.resolvedStyle.width;
            valikko.style.top = yla.y + 8;
            valikko.style.right = float.IsNaN(leveys) ? 10 : Mathf.Max(0, leveys - yla.x);
        }

        void TarkistaOhiNapautus()
        {
            if (!Auki) return;
            var osoitin = Pointer.current;
            if (osoitin == null || !osoitin.press.wasPressedThisFrame || valikko.panel == null) return;
            var ruutu = osoitin.position.ReadValue();
            var p = RuntimePanelUtils.ScreenToPanel(valikko.panel, new Vector2(ruutu.x, Screen.height - ruutu.y));
            if (!valikko.worldBound.Contains(p) && !nappi.worldBound.Contains(p) && !kartta.worldBound.Contains(p)) Sulje();
        }

        /// <summary>Testikomento ("ui linna valikko|huoneet|aanet|lahteet|sulje"): avaa näkymän kuvaa varten.</summary>
        public string Komento(string mita)
        {
            switch (mita)
            {
                case "valikko": Avaa(Nakyma.Paa); break;
                case "huoneet": Avaa(Nakyma.Huoneet); break;
                case "aanet": Avaa(Nakyma.Aanet); break;
                case "lahteet": Avaa(Nakyma.Lahteet); break;
                case "sulje": Sulje(); break;
                default: return "linna: valikko|huoneet|aanet|lahteet|sulje";
            }
            return $"linna: {(Auki ? nakyma.ToString() : "kiinni")}, huone {DioraamaAanet.NykyinenHuone ?? "-"}";
        }
    }
}
