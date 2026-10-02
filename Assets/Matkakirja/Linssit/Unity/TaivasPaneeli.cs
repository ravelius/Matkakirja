// TÄHTITAIVAAN PANEELI (Linssiseppä 29.9.2026; web pelikoodari-tahtitaivas d9a9438a, .tahtitaivas-vivut ja .tahtitaivas-kortti):
// alareunassa tilarivi (paikka · nyt/1873 · kello · tähtiä) ja vivut Nyt / 1873 / Livia kysyy; niiden yllä kortti (Horation
// päiväkirja 1873:n ensimmäisellä avauksella, sytytetyn tähdistön nimi ja huomio, Livian kysymys neljällä vaihtoehdolla ja
// palaute). UI Toolkit linssin yläkerroksessa (LinssiUi.Ylakerros), tyylit koodissa (webin värit: paperi #f5ecd6, ruskea teksti,
// oikea #cfe8c3 / väärä #f1cfc5). Kosketukset paneelissa eivät käännä taivasta (SyoteLukko.LisaaPeitto).
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class TaivasPaneeli
    {
        readonly VisualElement juuri, alue, kortti, valinnat;
        readonly Label tila, puhuja, teksti, latina, palaute;
        readonly Button nyt, v1873, kysy, sulje;
        readonly Func<Vector2, bool> peitto;
        static readonly Color Paperi = new Color32(0xf5, 0xec, 0xd6, 0xf2), Ruskea = new Color32(0x5a, 0x45, 0x26, 0xff),
            Kulta = new Color32(0xc9, 0xa2, 0x27, 0xff), Oikea = new Color32(0xcf, 0xe8, 0xc3, 0xff), Vaara = new Color32(0xf1, 0xcf, 0xc5, 0xff);

        public event Action<bool> TilaValittu;   // true = 1873
        public event Action KysyPainettu;
        public event Action<int> VastausValittu;
        public event Action KorttiSuljettu;

        public TaivasPaneeli()
        {
            var ui = UiKerros.Hae();
            juuri = ui.Juuri(LinssiUi.Ylakerros);
            alue = new VisualElement { name = "TaivasPaneeli", pickingMode = PickingMode.Ignore };
            var s = alue.style;
            s.position = Position.Absolute; s.left = 0; s.right = 0; s.bottom = 0; s.top = 0;
            s.justifyContent = Justify.FlexEnd; s.alignItems = Align.Center; s.paddingBottom = 26;
            juuri.Add(alue);

            kortti = new VisualElement { name = "TaivasKortti" };
            Tyyli(kortti.style, Paperi);
            kortti.style.maxWidth = 440; kortti.style.width = new Length(92, LengthUnit.Percent);
            kortti.style.paddingLeft = kortti.style.paddingRight = 14; kortti.style.paddingTop = kortti.style.paddingBottom = 12;
            kortti.style.marginBottom = 10;
            kortti.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());
            alue.Add(kortti);
            puhuja = Teksti(kortti, 14, true, new Color32(0x7a, 0x5b, 0x2e, 0xff));
            teksti = Teksti(kortti, 15, false, Ruskea);
            latina = Teksti(kortti, 13, false, Ruskea);
            latina.style.unityFontStyleAndWeight = FontStyle.Italic;
            valinnat = new VisualElement();
            valinnat.style.flexDirection = FlexDirection.Row; valinnat.style.flexWrap = Wrap.Wrap; valinnat.style.marginTop = 6;
            kortti.Add(valinnat);
            palaute = Teksti(kortti, 14, true, Ruskea);
            sulje = Nappi(kortti, "Sulje", () => { Piilota(); KorttiSuljettu?.Invoke(); }, Kulta);
            sulje.style.alignSelf = Align.FlexEnd; sulje.style.marginTop = 8;
            kortti.style.display = DisplayStyle.None;

            tila = Teksti(alue, 12, false, new Color(0.93f, 0.9f, 0.82f, 0.85f));
            tila.style.marginBottom = 6;
            var vivut = new VisualElement();
            vivut.style.flexDirection = FlexDirection.Row;
            vivut.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());
            alue.Add(vivut);
            nyt = Nappi(vivut, "Nyt", () => TilaValittu?.Invoke(false), null);
            v1873 = Nappi(vivut, "1873", () => TilaValittu?.Invoke(true), null);
            kysy = Nappi(vivut, "Livia kysyy", () => KysyPainettu?.Invoke(), null);
            kysy.style.marginLeft = 12;

            peitto = p =>
            {
                var paneelissa = RuntimePanelUtils.ScreenToPanel(juuri.panel, new Vector2(p.x, Screen.height - p.y));
                return (kortti.resolvedStyle.display == DisplayStyle.Flex && kortti.worldBound.Contains(paneelissa))
                    || vivut.worldBound.Contains(paneelissa);
            };
            SyoteLukko.LisaaPeitto(peitto);
        }

        /// <summary>Onko ruutupiste (Unityn ruutukoordinaatit, y ylös) paneelin päällä.</summary>
        public bool Peittaa(Vector2 ruutu) => juuri.panel != null && peitto(ruutu);

        static void Tyyli(IStyle s, Color tausta)
        {
            s.backgroundColor = tausta;
            s.borderTopLeftRadius = s.borderTopRightRadius = s.borderBottomLeftRadius = s.borderBottomRightRadius = 10;
            s.borderTopWidth = s.borderBottomWidth = s.borderLeftWidth = s.borderRightWidth = 1;
            s.borderTopColor = s.borderBottomColor = s.borderLeftColor = s.borderRightColor = new Color(0.48f, 0.36f, 0.18f, 0.6f);
        }

        static Label Teksti(VisualElement isa, int koko, bool lihava, Color vari)
        {
            var l = new Label { enableRichText = false };
            l.style.fontSize = koko; l.style.color = vari; l.style.whiteSpace = WhiteSpace.Normal;
            l.style.unityFontStyleAndWeight = lihava ? FontStyle.Bold : FontStyle.Normal;
            Kirjasimet.Aseta(l, lihava ? Kirjasin.LukuLihava : Kirjasin.Luku);
            isa.Add(l);
            return l;
        }

        static Button Nappi(VisualElement isa, string teksti, Action painettu, Color? tausta)
        {
            var b = new Button(painettu) { text = teksti };
            var s = b.style;
            s.minHeight = 44; s.paddingLeft = s.paddingRight = 14; s.marginLeft = s.marginRight = 4;
            s.fontSize = 15; s.color = tausta.HasValue ? Ruskea : new Color(0.96f, 0.93f, 0.86f);
            s.backgroundColor = tausta ?? new Color(0.08f, 0.1f, 0.16f, 0.72f);
            s.borderTopLeftRadius = s.borderTopRightRadius = s.borderBottomLeftRadius = s.borderBottomRightRadius = Tyylikirja.Kulma.Nappi;
            s.borderTopWidth = s.borderBottomWidth = s.borderLeftWidth = s.borderRightWidth = 1;
            s.borderTopColor = s.borderBottomColor = s.borderLeftColor = s.borderRightColor = new Color(0.94f, 0.89f, 0.76f, 0.5f);
            Kirjasimet.Aseta(b, Kirjasin.Luku);
            isa.Add(b);
            return b;
        }

        public void Tila(string rivi, bool vuosi1873)
        {
            tila.text = rivi;
            Korosta(nyt, !vuosi1873);
            Korosta(v1873, vuosi1873);
        }

        static void Korosta(Button b, bool valittu)
        {
            b.style.backgroundColor = valittu ? new Color(0.79f, 0.64f, 0.16f, 0.9f) : new Color(0.08f, 0.1f, 0.16f, 0.72f);
            b.style.color = valittu ? new Color(0.2f, 0.15f, 0.08f) : new Color(0.96f, 0.93f, 0.86f);
        }

        /// <summary>Kortti: puhuja, teksti ja valinnainen latina; vaihtoehdot tyhjänä, palaute tyhjänä.</summary>
        public void Nayta(string kuka, string sisalto, string lat = null, IList<string> vaihtoehdot = null)
        {
            puhuja.text = kuka ?? "";
            puhuja.style.display = string.IsNullOrEmpty(kuka) ? DisplayStyle.None : DisplayStyle.Flex;
            teksti.text = sisalto ?? "";
            latina.text = lat ?? "";
            latina.style.display = string.IsNullOrEmpty(lat) ? DisplayStyle.None : DisplayStyle.Flex;
            palaute.text = "";
            palaute.style.display = DisplayStyle.None;
            valinnat.Clear();
            if (vaihtoehdot != null)
                for (int i = 0; i < vaihtoehdot.Count; i++)
                {
                    int n = i;
                    var b = Nappi(valinnat, vaihtoehdot[i], () => VastausValittu?.Invoke(n), Paperi);
                    b.style.width = new Length(46, LengthUnit.Percent);
                    b.style.borderTopLeftRadius = b.style.borderTopRightRadius = b.style.borderBottomLeftRadius = b.style.borderBottomRightRadius = 8;
                    b.style.marginTop = 4;
                }
            kortti.style.display = DisplayStyle.Flex;
        }

        /// <summary>Vastauksen jälkeen: oikea vihreäksi, valittu väärä punaiseksi, palaute ja napit lukkoon.</summary>
        public void Vastaus(int valittu, int oikea, string teksti2, bool oikein)
        {
            int i = 0;
            foreach (var c in valinnat.Children())
            {
                if (c is Button b)
                {
                    b.SetEnabled(false);
                    if (i == oikea) b.style.backgroundColor = Oikea;
                    else if (i == valittu) b.style.backgroundColor = Vaara;
                }
                i++;
            }
            palaute.text = teksti2;
            palaute.style.color = (Color)(oikein ? new Color32(0x2e, 0x6b, 0x2e, 0xff) : new Color32(0x8a, 0x2f, 0x1c, 0xff));
            palaute.style.display = DisplayStyle.Flex;
        }

        public void Piilota() => kortti.style.display = DisplayStyle.None;
        public bool KorttiAuki => kortti.style.display == DisplayStyle.Flex;

        public void Poista()
        {
            SyoteLukko.PoistaPeitto(peitto);
            alue.RemoveFromHierarchy();
        }
    }
}
