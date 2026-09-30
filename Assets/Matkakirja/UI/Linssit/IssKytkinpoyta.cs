// ISS-KYTKINPÖYTÄ (Linssiseppä 30.9.2026, Päätoimittajan erä ennen Codexin kuvia): kyydin säätimet alareunan kapeana
// ohjauspöytänä avaruusaluksen kytkimin (IssKytkimet: paikkamerkit, jotka vaihtuvat Codexin kuviin yhdellä muutoksella).
//
//   rivi 1  merkkivalo LIVE (vihreä LIVE, meripihka nopeutettu; napautus nopeutettuna = Palaa LIVE) · lukemanäyttö
//           (rivi 1 = kyydin tietorivi ISS · 429 km · 27 550 km/h, rivi 2 = ylilento tai lennon kohde)
//   rivi 2  NOPEUS kiertokytkin LIVE/10×/100×/1000× · PILVET nuppi · VUODENAIKA nuppi (kuukausi) · KOHDE painike
//           (lista pöydän yläpuolelle) · OMA vipukytkin suojakannella (kansi auki → vipu → lento omaan paikkaan) · SULKU painike
//
// Pöydän leveys ruutu − 24, enintään 560 pt, keskellä; korkeus ~116 pt (iPhone 874 pt: 13 %). Tekstit piirtää peli.
// IssKyytiNakyma omistaa toiminnot ja tilan; tämä on vain kokoonpano (A/B `astro kyyti poyta 0|1`: 0 = entinen välilehtipaneeli).
using System;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class IssKytkinpoyta
    {
        public readonly IssKytkimet.Pohja Juuri;
        public readonly IssKytkimet.Merkkivalo Live;
        public readonly IssKytkimet.Lukema Lukema;
        public readonly IssKytkimet.Kiertokytkin Nopeus;
        public readonly IssKytkimet.Nuppi Pilvet, Vuodenaika;
        public readonly IssKytkimet.Painike Kohde, Sulku;
        public readonly IssKytkimet.Vipu Oma;

        public const float PoytaEnintaan = 560f;

        public IssKytkinpoyta(VisualElement isa, Action<int> nopeus, Action<float> pilvet, Action<float> kuukausi,
            Action kohde, Action oma, Action sulku, Action palaaLive)
        {
            Juuri = new IssKytkimet.Pohja { name = "IssKytkinpoyta" };
            var s = Juuri.style;
            s.position = Position.Absolute; s.bottom = 8;
            s.paddingLeft = 10; s.paddingRight = 10; s.paddingTop = 8; s.paddingBottom = 6;
            isa.Add(Juuri);

            var ylarivi = new VisualElement { pickingMode = PickingMode.Ignore };
            ylarivi.style.flexDirection = FlexDirection.Row; ylarivi.style.alignItems = Align.Center; ylarivi.style.marginBottom = 14;
            Juuri.Add(ylarivi);
            Live = new IssKytkimet.Merkkivalo("LIVE");
            Live.AddManipulator(new Clickable(() => palaaLive?.Invoke()));
            ylarivi.Add(Live);
            Lukema = new IssKytkimet.Lukema();
            Lukema.style.flexGrow = 1; Lukema.style.marginLeft = 6;
            ylarivi.Add(Lukema);

            var saatimet = new VisualElement { pickingMode = PickingMode.Ignore };
            saatimet.style.flexDirection = FlexDirection.Row; saatimet.style.justifyContent = Justify.SpaceBetween;
            Juuri.Add(saatimet);
            string[] kertoimet = new string[Matkakirja.Linssit.Iss.Simukello.Nopeudet.Length];
            for (int i = 0; i < kertoimet.Length; i++)
                kertoimet[i] = Matkakirja.Linssit.Iss.Simukello.Nopeudet[i] == 1 ? "LIVE" : Matkakirja.Linssit.Iss.Simukello.Nopeudet[i] + "×";
            Nopeus = new IssKytkimet.Kiertokytkin("NOPEUS", kertoimet, i => nopeus?.Invoke(Matkakirja.Linssit.Iss.Simukello.Nopeudet[i]));
            Pilvet = new IssKytkimet.Nuppi("PILVET", 0f, 1f, v => pilvet?.Invoke(v));
            Vuodenaika = new IssKytkimet.Nuppi("KUUKAUSI", 1f, 12f, v => kuukausi?.Invoke(v), kokonaisluku: true);
            Kohde = new IssKytkimet.Painike("KOHDE", "LENNÄ", () => kohde?.Invoke());
            Oma = new IssKytkimet.Vipu("OMA PAIKKA", () => oma?.Invoke());
            Sulku = new IssKytkimet.Painike("POISTU", "×", () => sulku?.Invoke(), leveys: 52f);   // ✕ puuttuu fontista (□)
            foreach (var m in new VisualElement[] { Nopeus, Pilvet, Vuodenaika, Kohde, Oma, Sulku }) saatimet.Add(m);
        }

        /// <summary>Leveys ja keskitys turva-alueen leveydestä (ruutu − 24, enintään 560 pt).</summary>
        public void Asettele(float turvanLeveys)
        {
            if (!(turvanLeveys > 0)) return;
            float w = Mathf.Min(PoytaEnintaan, turvanLeveys - 24f);
            Juuri.style.width = w;
            Juuri.style.left = (turvanLeveys - w) * 0.5f;
        }
    }
}
