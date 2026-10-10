// LENTOPELIN OHJAIN (Linssiseppä 1.10.2026, lentopeli vaihe 1 -proto). Pohja: LINSSIN OHJAIN (ui-pohjat-kartoitus-20261001
// kohta 6): alareunan nauha, peitto ≤ 25 %, teema LASI, otsikko kapiteeli 12 vasemmalla, säätimet KYTKIN/TOIMINTO, lukema Kone.
//
//   rivi 1    kapiteeli "LENTOPELI · RENGAS 2/6" + TOIMINTO "Lopeta" (sulku, kuten linssin Sulje)
//   rivi 2    lukema (Kone): polttoaine % · korkeus · nopeus · suunta · kotiin / paluusäde (km)
//   KAASUVIPU (omistajan speksi "kaasuvipu", Päätoimittaja 1.10. 18.5x): pystyliuku oikeassa reunassa PANEELIn säätimen
//             mitoin (rata 8 pt, nuppi), pykälät TÄYSI · MATKA · TALOUS · TYHJÄ ylhäältä alas, nuppi teeman toiminto-värillä
//             (LASI = kulta). Veto siirtää nuppia ja kaasu on lähin pykälä; irrotus napsauttaa pykälään.
//
// Sauva on ohjaimen ulkopuolella (Nappula.Lentopeli: peukaloveto, UiPeittaa erottaa ohjaimen napautukset).
using Matkakirja.Linssit;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class LentopeliNakyma
    {
        /// <summary>Pykälät ylhäältä alas (vivun suunta: ylös = enemmän kaasua).</summary>
        static readonly (string Nimi, Lentopeli.Kaasu Kaasu)[] Kaasut =
        {
            ("ui.lentopeli.kaasu-taysi", Lentopeli.Kaasu.Taysi), ("ui.lentopeli.kaasu-matka", Lentopeli.Kaasu.Matka),
            ("ui.lentopeli.kaasu-talous", Lentopeli.Kaasu.Talous), ("ui.lentopeli.kaasu-tyhja", Lentopeli.Kaasu.Tyhjakaynti),
        };

        readonly UiKerros kerros;
        readonly VisualElement juuri, paneeli;
        readonly Label otsikko, lukema;
        readonly VisualElement vipu, nuppi;
        readonly Label[] pykalat = new Label[Kaasut.Length];
        int vetoId = -1;
        /// <summary>Vivun radan korkeus ja pykälien väli (pt): TÄYSI ylhäällä (y = Reuna), TYHJÄ alhaalla.</summary>
        const float VipuKorkeus = 232f, Reuna = 16f, NuppiKoko = 28f;
        static float PykalanY(int i) => Reuna + i * (VipuKorkeus - 2f * Reuna) / (Kaasut.Length - 1);
        IVisualElementScheduledItem paivitys;

        public LentopeliNakyma(UiKerros kerros)
        {
            this.kerros = kerros;
            juuri = Rakenne.El("mk-lento", kerros.Juuri(LinssiUi.RadioKerros), PickingMode.Ignore);
            juuri.style.display = DisplayStyle.None;
            paneeli = Rakenne.El("mk-lento__paneeli", juuri);
            paneeli.AddToClassList("tk-teema-lasi");

            var rivi1 = Rakenne.El("mk-lento__rivi", paneeli, PickingMode.Ignore);
            otsikko = Rakenne.Teksti(Kieli.T("ui.lentopeli.otsikko"), "mk-lento__otsikko", rivi1);
            Kirjasimet.Aseta(otsikko, Kirjasin.Kone);
            var lopeta = Rakenne.Nappi(Kieli.T("ui.lentopeli.lopeta"), "mk-lento__lopeta", () => Nappula.Lentopelissa?.Lopeta(), rivi1);
            Kirjasimet.Aseta(lopeta, Kirjasin.Kone);

            lukema = Rakenne.Teksti("", "mk-lento__lukema", paneeli);
            Kirjasimet.Aseta(lukema, Kirjasin.Kone);

            // Kaasuvipu oikeaan reunaan (oma juuri: ohjaimen nauha ja vipu ovat eri paikoissa).
            vipu = Rakenne.El("mk-lento-vipu", kerros.Juuri(LinssiUi.RadioKerros));
            vipu.AddToClassList("tk-teema-lasi");
            vipu.style.display = DisplayStyle.None;
            Rakenne.El("mk-lento-vipu__rata", vipu, PickingMode.Ignore);
            for (int i = 0; i < Kaasut.Length; i++)
            {
                pykalat[i] = Rakenne.Teksti(Kieli.T(Kaasut[i].Nimi), "mk-lento-vipu__pykala", vipu);
                pykalat[i].style.top = PykalanY(i) - 11f;
                Kirjasimet.Aseta(pykalat[i], Kirjasin.Kone);
            }
            nuppi = Rakenne.El("mk-lento-vipu__nuppi", vipu, PickingMode.Ignore);
            vipu.RegisterCallback<PointerDownEvent>(e =>
            {
                vetoId = e.pointerId;
                vipu.CapturePointer(e.pointerId);
                Veda(e.localPosition.y);
                e.StopPropagation();
            });
            vipu.RegisterCallback<PointerMoveEvent>(e => { if (e.pointerId == vetoId) Veda(e.localPosition.y); });
            vipu.RegisterCallback<PointerUpEvent>(e =>
            {
                if (e.pointerId != vetoId) return;
                vetoId = -1;
                vipu.ReleasePointer(e.pointerId);
                Paivita();   // nuppi napsahtaa pykälään
            });

            kerros.TurvaMuuttui += Asettele;
            Asettele();
            Nappula.LentopeliVaihtui += Vaihtui;
            Vaihtui(Nappula.Lentopelissa != null);
        }

        public bool Nakyvissa => juuri.style.display == DisplayStyle.Flex;

        /// <summary>Ala 18 + turva-alue, sivuilla 16 (kuten maapallon vuoden ohjain).</summary>
        void Asettele()
        {
            var r = kerros.Reunat(UiKerros.Valikot);
            juuri.style.bottom = 18f + r.w;
            juuri.style.left = 16f + r.x;
            juuri.style.right = 16f + r.z;
            vipu.style.right = 16f + r.z;
        }

        /// <summary>Veto vivulla: nuppi seuraa sormea, kaasu = lähin pykälä (autopilotti pois).</summary>
        void Veda(float y)
        {
            var a = Nappula.Lentopelissa;
            if (a == null) return;
            y = Mathf.Clamp(y, Reuna, VipuKorkeus - Reuna);
            nuppi.style.top = y - NuppiKoko / 2f;
            int i = Mathf.RoundToInt((y - Reuna) / (VipuKorkeus - 2f * Reuna) * (Kaasut.Length - 1));
            a.Kaasu = Kaasut[Mathf.Clamp(i, 0, Kaasut.Length - 1)].Kaasu;
            a.Autopilotti = false;
            for (int k = 0; k < pykalat.Length; k++) pykalat[k].EnableInClassList("mk-valittu", Kaasut[k].Kaasu == a.Kaasu);
        }

        void Vaihtui(bool paalla)
        {
            juuri.style.display = paalla ? DisplayStyle.Flex : DisplayStyle.None;
            vipu.style.display = paalla ? DisplayStyle.Flex : DisplayStyle.None;
            vetoId = -1;
            paivitys?.Pause();
            paivitys = null;
            if (!paalla) return;
            Paivita();
            // Lukemat 10 Hz (ei joka kehys: UITK-asettelu maksaa; suunnitelma kohta 6: mittarit ≤ 1,0 ms).
            paivitys = juuri.schedule.Execute(Paivita).Every(100);
        }

        void Paivita()
        {
            var a = Nappula.Lentopelissa;
            if (a == null) return;
            var l = a.Lento;
            var t = l.Tila;
            otsikko.text = a.Lataus >= 0f ? Kieli.T("ui.lentopeli.otsikko-lataus", (a.Lataus * 100f).ToString("0"))
                : l.RataValmis ? Kieli.T("ui.lentopeli.otsikko-paluu") : Kieli.T("ui.lentopeli.otsikko-rengas", l.Seuraava + 1, l.Rata.Length);
            // Nopeus Tiger Mothin km/h:na (pelin 2,2 km/s = matkanopeus 145 km/h, suunnitelma kohta 2).
            double kmh = t.NopeusKms / Lentopeli.Tavoitenopeus(Lentopeli.Kaasu.Matka) * 145.0;
            // Yksi rivi puhelimen pystykuvaan (simulaattori 5ac7d518: pitkä rivi rivittyi kahdeksi).
            lukema.text = Kieli.T("ui.lentopeli.lukema", (t.Polttoaine * 100).ToString("0"), t.KorkeusKm.ToString("0.0"), kmh.ToString("0"), ((t.Suunta % 360 + 360) % 360).ToString("000"))
                          + Kieli.T("ui.lentopeli.lukema-kotiin", a.KotiinKm.ToString("0"), a.PaluuKm.ToString("0")) + (t.Moottori ? "" : Kieli.T("ui.lentopeli.lukema-liito")) + (t.Sakkaus > 0 ? Kieli.T("ui.lentopeli.lukema-sakkaus") : "");
            if (vetoId >= 0) return;   // veto kesken: nuppi seuraa sormea
            for (int i = 0; i < Kaasut.Length; i++)
            {
                bool valittu = Kaasut[i].Kaasu == a.Kaasu;
                pykalat[i].EnableInClassList("mk-valittu", valittu);
                if (valittu) nuppi.style.top = PykalanY(i) - NuppiKoko / 2f;
            }
        }
    }
}
