// KEHITTÄJÄN MIKSERIPANEELI (Natiivi-UI 30.9.2026, Päätoimittaja: omistaja säätää linnan ja Cupolan kaiut ja taustaäänet
// itse laitteella). Pelikoodari tuo äänipuolen (IMikseriLahde) ja asettaa MikseriPaneeli.Lahde; paneeli on pelkkä UI:
// huonekohtaiset liukusäätimet lähteen kuvauksista, A/B-kytkin (A = tallennettu, B = muokattu) ja Tallenna.
// Omistaja 30.9.2026: "Tee mikseri napin taakse jotta voin ottaa sen näkyviin ja piiloon helposti." Pyöreä säädinkuvakenappi
// (44 pt) vasemmassa reunassa 38 % korkeudella (ei ‹/↻-nappien, ×:n eikä infotaulun kohdalla) avaa ja sulkee paneelin; arvot
// ja A/B säilyvät suljettaessa (ääni soi säädetyillä arvoilla). Auki 300 pt leveä lasi, jota vedetään otsikosta,
// korkeus enintään 45 % ruudusta (linna jää näkyviin). Vain kehittäjätilassa ja kun lähde on olemassa.
// Testi: ui mikseri [tila] | auki | kiinni | demo (demolähde ilman ääntä simulaattorikuviin).
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    /// <summary>Yksi säädin: arvo lähteen omissa yksiköissä (esim. dB, s, %).</summary>
    public sealed class MikseriSaadin
    {
        public string Id, Nimi, Yksikko = "";
        public float Min, Max = 1f, Arvo;
        public int Desimaalit = 1;
    }

    /// <summary>Äänipuolen rajapinta (Pelikoodari). Versio vaihtuu, kun huone tai säädinjoukko vaihtuu.</summary>
    public interface IMikseriLahde
    {
        string Otsikko { get; }
        int Versio { get; }
        IReadOnlyList<MikseriSaadin> Saatimet { get; }
        void Aseta(string id, float arvo);
        /// <summary>B = muokatut arvot soivat, A = tallennetut (vertailu korvalla).</summary>
        bool B { get; set; }
        /// <summary>Tallentaa muokatut arvot; palauttaa tilarivin (esim. "tallennettu keittio 18.42").</summary>
        string Tallenna();
    }

    public sealed class MikseriPaneeli
    {
        /// <summary>Pelikoodari asettaa, kun linna- tai Cupola-ääni on käytössä; null = paneeli piilossa.</summary>
        public static IMikseriLahde Lahde;
        public const int Kerros = 39; // LinssiUi.SulkuKerros 38:n yläpuolella, Valikot 40:n alla

        static readonly Color Lasi = new Color(0.07f, 0.06f, 0.05f, 0.86f);
        static readonly Color Kulta = new Color(0.918f, 0.722f, 0.306f);
        static readonly Color Paperi = new Color(0.97f, 0.94f, 0.88f);

        readonly VisualElement juuri, lappu, paneeli, rivit;
        readonly Label otsikko, tila;
        readonly Button aNappi, bNappi;
        readonly Dictionary<string, (Slider Saadin, Label Arvo, MikseriSaadin Kuvaus)> saatimet = new Dictionary<string, (Slider, Label, MikseriSaadin)>();
        bool auki;
        /// <summary>OHJAUSNAPPI-koe (OhjausryhmaKoe): säätönappi ryhmään.</summary>
        internal VisualElement Lappu => lappu;
        internal void Vaihda() => Avaa(!auki);
        int versio = int.MinValue;
        IMikseriLahde kytketty;
        Vector2 paikka = new Vector2(62f, 120f), vetoAlku, paikkaAlku;
        bool vedetaan;

        public static MikseriPaneeli Viimeisin { get; private set; }

        public MikseriPaneeli(UiKerros kerros)
        {
            // Turva-alueen sisään (44f3a13f-vaakakuva: nappi jäi Dynamic Islandin alle vasempaan reunaan).
            juuri = Rakenne.El("mk-mikseri", kerros.Turva(Kerros), PickingMode.Ignore);
            juuri.style.position = Position.Absolute;
            juuri.style.left = 0; juuri.style.right = 0; juuri.style.top = 0; juuri.style.bottom = 0;
            juuri.style.display = DisplayStyle.None;

            lappu = Rakenne.Nappi(null, "mk-mikseri__nappi-auki", () => Avaa(!auki), juuri, Ikonit.Mikseri);
            lappu.style.position = Position.Absolute;
            lappu.style.left = 8; lappu.style.top = Length.Percent(38);
            lappu.style.width = 44; lappu.style.height = 44;
            lappu.style.backgroundColor = Lasi;
            lappu.style.borderTopLeftRadius = 22; lappu.style.borderTopRightRadius = 22;
            lappu.style.borderBottomLeftRadius = 22; lappu.style.borderBottomRightRadius = 22;
            lappu.style.alignItems = Align.Center; lappu.style.justifyContent = Justify.Center;
            lappu.style.color = Kulta;
            lappu.tooltip = "Mikseri";
            lappu.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());

            paneeli = Rakenne.El("mk-mikseri__paneeli", juuri, PickingMode.Position);
            paneeli.style.position = Position.Absolute;
            paneeli.style.width = 300;
            paneeli.style.maxHeight = Length.Percent(45);
            paneeli.style.backgroundColor = Lasi;
            paneeli.style.borderTopLeftRadius = 12; paneeli.style.borderTopRightRadius = 12;
            paneeli.style.borderBottomLeftRadius = 12; paneeli.style.borderBottomRightRadius = 12;
            paneeli.style.paddingLeft = 12; paneeli.style.paddingRight = 12; paneeli.style.paddingBottom = 10;
            paneeli.style.display = DisplayStyle.None;
            paneeli.RegisterCallback<PointerDownEvent>(e => e.StopPropagation()); // ei valu dioraamalle tai pallolle

            // Otsikkorivi = vetokahva: nimi vasemmalla, ✕ (kiinni) oikealla.
            var yla = Rakenne.El("mk-mikseri__yla", paneeli, PickingMode.Position);
            yla.style.flexDirection = FlexDirection.Row; yla.style.alignItems = Align.Center;
            yla.style.height = 36;
            otsikko = Rakenne.Teksti("Mikseri", "mk-mikseri__otsikko", yla);
            Kirjasimet.Aseta(otsikko, Kirjasin.KoneBold);
            otsikko.style.color = Kulta; otsikko.style.fontSize = 13; otsikko.style.flexGrow = 1;
            otsikko.pickingMode = PickingMode.Ignore;
            var kiinni = Rakenne.Nappi("×", "mk-mikseri__kiinni", () => Avaa(false), yla); // ✕ puuttuu kirjasimesta (laatikko)
            kiinni.style.backgroundColor = new Color(0, 0, 0, 0);
            var kt = kiinni.Q<Label>();
            if (kt != null) { kt.style.color = Paperi; kt.style.fontSize = 22; }
            yla.RegisterCallback<PointerDownEvent>(e => { vedetaan = true; vetoAlku = e.position; paikkaAlku = paikka; yla.CapturePointer(e.pointerId); });
            yla.RegisterCallback<PointerMoveEvent>(e => { if (!vedetaan) return; paikka = paikkaAlku + (Vector2)e.position - vetoAlku; Sijoita(); });
            yla.RegisterCallback<PointerUpEvent>(e => { vedetaan = false; yla.ReleasePointer(e.pointerId); });

            var vieritys = new ScrollView(ScrollViewMode.Vertical) { verticalScrollerVisibility = ScrollerVisibility.Hidden };
            vieritys.style.flexShrink = 1;
            paneeli.Add(vieritys);
            rivit = vieritys.contentContainer;

            // A/B + Tallenna + tilarivi.
            var ala = Rakenne.El("mk-mikseri__ala", paneeli);
            ala.style.flexDirection = FlexDirection.Row; ala.style.alignItems = Align.Center; ala.style.marginTop = 8;
            aNappi = Nappi("A", ala, () => AsetaB(false));
            bNappi = Nappi("B", ala, () => AsetaB(true));
            var tyhja = new VisualElement(); tyhja.style.flexGrow = 1; ala.Add(tyhja);
            Nappi("Tallenna", ala, Tallenna);
            tila = Rakenne.Teksti("", "mk-mikseri__tila", paneeli);
            Kirjasimet.Aseta(tila, Kirjasin.Kone);
            tila.style.color = new Color(Paperi.r, Paperi.g, Paperi.b, 0.7f); tila.style.fontSize = 11; tila.style.marginTop = 4;

            kerros.JokaRuutu += Paivita;
            Viimeisin = this;
        }

        static Button Nappi(string teksti, VisualElement isa, Action toiminto)
        {
            var b = Rakenne.Nappi(teksti, "mk-mikseri__nappi", toiminto, isa);
            b.style.backgroundColor = new Color(1f, 1f, 1f, 0.08f);
            b.style.borderTopLeftRadius = 8; b.style.borderTopRightRadius = 8; b.style.borderBottomLeftRadius = 8; b.style.borderBottomRightRadius = 8;
            b.style.paddingLeft = 12; b.style.paddingRight = 12; b.style.height = 34; b.style.marginRight = 6;
            b.style.justifyContent = Justify.Center;
            var l = b.Q<Label>();
            if (l != null) { Kirjasimet.Aseta(l, Kirjasin.Kone); l.style.color = Paperi; l.style.fontSize = 12; }
            return b;
        }

        public void Avaa(bool a)
        {
            auki = a;
            if (a) Sijoita();
        }

        void Sijoita()
        {
            float pw = juuri.layout.width, ph = juuri.layout.height;
            if (float.IsNaN(pw) || pw <= 0) return;
            float w = paneeli.layout.width, h = paneeli.layout.height;
            if (float.IsNaN(w) || w <= 0) { w = 300f; h = 200f; }
            paikka.x = Mathf.Clamp(paikka.x, 0f, Mathf.Max(0f, pw - w));
            paikka.y = Mathf.Clamp(paikka.y, 0f, Mathf.Max(0f, ph - Mathf.Min(h, 60f)));
            paneeli.style.left = paikka.x;
            paneeli.style.top = paikka.y;
        }

        void Paivita()
        {
            var l = Asetukset.Kehittaja ? Lahde : null;
            juuri.style.display = l != null ? DisplayStyle.Flex : DisplayStyle.None;
            if (l == null) { kytketty = null; return; }
            if (!ReferenceEquals(l, kytketty) || l.Versio != versio) Rakenna(l);
            lappu.style.backgroundColor = auki ? new Color(Kulta.r, Kulta.g, Kulta.b, 0.9f) : Lasi;
            lappu.style.color = auki ? Lasi : Kulta;
            paneeli.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
            if (!auki) return;
            otsikko.text = l.Otsikko ?? "Mikseri";
            bool b = l.B;
            aNappi.style.backgroundColor = !b ? Kulta : new Color(1f, 1f, 1f, 0.08f);
            bNappi.style.backgroundColor = b ? Kulta : new Color(1f, 1f, 1f, 0.08f);
            if (vedetaan) return;
            Sijoita();
        }

        void Rakenna(IMikseriLahde l)
        {
            kytketty = l;
            versio = l.Versio;
            rivit.Clear();
            saatimet.Clear();
            if (l.Saatimet == null) return;
            foreach (var k in l.Saatimet)
            {
                var kuvaus = k;
                if (k.Min == 0f && k.Max == 1f && k.Desimaalit == 0) { Kytkin(k); continue; } // 0/1 (esim. kaiku-ab) kytkimenä
                var rivi = Rakenne.El("mk-saadinrivi", rivit);
                var nimi = Rakenne.Teksti(k.Nimi ?? k.Id, "mk-saadinrivi__nimi", rivi);
                nimi.style.color = Paperi;
                var s = new Slider(k.Min, k.Max) { pageSize = 0, fill = true };
                s.AddToClassList("mk-saadin");
                s.SetValueWithoutNotify(k.Arvo);
                rivi.Add(s);
                var arvo = Rakenne.Teksti(Muoto(k, k.Arvo), "mk-saadinrivi__arvo", rivi);
                s.RegisterValueChangedCallback(e =>
                {
                    arvo.text = Muoto(kuvaus, e.newValue);
                    kytketty?.Aseta(kuvaus.Id, e.newValue);
                    if (kytketty != null && !kytketty.B) kytketty.B = true; // muokkaus kuuluu heti (B)
                });
                saatimet[k.Id] = (s, arvo, k);
            }
            tila.text = "";
        }

        /// <summary>0/1-säädin (Pelikoodari: Min 0, Max 1, Desimaalit 0, esim. "kaiku-ab") kytkimenä: napautus vaihtaa.</summary>
        void Kytkin(MikseriSaadin k)
        {
            var rivi = Rakenne.El("mk-saadinrivi", rivit);
            rivi.style.flexDirection = FlexDirection.Row; rivi.style.alignItems = Align.Center; rivi.style.minHeight = 40;
            var nimi = Rakenne.Teksti(k.Nimi ?? k.Id, "mk-saadinrivi__nimi", rivi);
            nimi.style.color = Paperi; nimi.style.flexGrow = 1;
            Button nappi = null;
            void Nayta() { var l = nappi.Q<Label>(); if (l != null) l.text = k.Arvo >= 0.5f ? "päällä" : "pois";
                nappi.style.backgroundColor = k.Arvo >= 0.5f ? Kulta : new Color(1f, 1f, 1f, 0.08f); }
            nappi = Nappi("", rivi, () =>
            {
                k.Arvo = k.Arvo >= 0.5f ? 0f : 1f;
                kytketty?.Aseta(k.Id, k.Arvo);
                if (kytketty != null && !kytketty.B) kytketty.B = true;
                Nayta();
            });
            nappi.style.minWidth = 76; nappi.style.marginRight = 0;
            Nayta();
        }

        static string Muoto(MikseriSaadin k, float v) =>
            v.ToString("F" + Mathf.Clamp(k.Desimaalit, 0, 3), System.Globalization.CultureInfo.GetCultureInfo("fi-FI")) +
            (string.IsNullOrEmpty(k.Yksikko) ? "" : " " + k.Yksikko);

        void AsetaB(bool b)
        {
            if (kytketty == null) return;
            kytketty.B = b;
            tila.text = b ? "B: muokatut arvot" : "A: tallennetut arvot";
        }

        void Tallenna()
        {
            if (kytketty == null) return;
            tila.text = kytketty.Tallenna() ?? "tallennettu";
        }

        /// <summary>Testikomento (ui mikseri): tila ja säätimet.</summary>
        public string Kuvaus
        {
            get
            {
                if (kytketty == null) return Lahde == null ? "ei lähdettä" : (Asetukset.Kehittaja ? "lähde, ei vielä kytketty" : "kehittäjätila pois");
                var osat = new List<string>();
                foreach (var p in saatimet.Values) osat.Add($"{p.Kuvaus.Id}={p.Saadin.value:0.##}");
                return $"{(auki ? "auki" : "kiinni")} · {kytketty.Otsikko} · {(kytketty.B ? "B" : "A")} · " + string.Join(", ", osat) + (tila.text.Length > 0 ? " · " + tila.text : "");
            }
        }

        /// <summary>Demolähde simulaattorikuviin ennen äänipuolen rajapintaa (ui mikseri demo).</summary>
        public sealed class Demo : IMikseriLahde
        {
            readonly List<MikseriSaadin> s = new List<MikseriSaadin>
            {
                new MikseriSaadin { Id = "kaiku-ab", Nimi = "Kaiku", Min = 0, Max = 1, Arvo = 1, Desimaalit = 0 },
                new MikseriSaadin { Id = "kaiku", Nimi = "Kaiun määrä", Min = 0, Max = 2, Arvo = 0.7f, Desimaalit = 2 },
                new MikseriSaadin { Id = "jalkikaiku", Nimi = "Jälkikaiku", Min = 0.2f, Max = 4f, Arvo = 1.6f, Yksikko = "s" },
                new MikseriSaadin { Id = "tausta", Nimi = "Taustaäänet", Min = -30, Max = 6, Arvo = -8, Yksikko = "dB", Desimaalit = 0 },
                new MikseriSaadin { Id = "tuli", Nimi = "Tulisija", Min = -30, Max = 6, Arvo = -4, Yksikko = "dB", Desimaalit = 0 },
            };
            public string Otsikko => "Olavinlinna · Keittiö (demo)";
            public int Versio => 1;
            public IReadOnlyList<MikseriSaadin> Saatimet => s;
            public void Aseta(string id, float arvo) { foreach (var k in s) if (k.Id == id) k.Arvo = arvo; }
            public bool B { get; set; }
            public string Tallenna() => "tallennettu (demo) " + DateTime.Now.ToString("HH.mm");
        }
    }
}
