// KAUPUNKIKOOSTEEN KUVA (LS1 8.10.2026, Natiivisepän TAA, Päätoimittaja kuitannut): kun Laatutaso.Ajallinen on päällä, pallon kori,
// sääkerros ja yksityiskohtakortti piirtyvät yhteiseen RenderTextureen kamerapinon sijaan (URP ajaa TAA:n vain ilman pinoa).
// Tämä näyttää sen koko ruudun kuvana UI:n alimpana kerroksena (Kerros 4: pienen liikkeen 10, nostojen ja kaikkien nappien
// ja tappien alla). Lähde Matkakirja.Linssit.KaupunkiKooste.Kuva (LS1) heijastuksella; null = piilossa. Suora alfa, ei
// sävytystä (tint valkoinen), ei osumia (PickingMode.Ignore).
using System.Reflection;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class KaupunkiKoosteKuva
    {
        /// <summary>UI:n alin kerros (LinssiUi.SumuKerros 5:n ja PieniLiike 10:n alla).</summary>
        public const int Kerros = 4;

        readonly VisualElement kuva;
        RenderTexture nyt;
        static PropertyInfo lahde;
        static bool haettu;

        public KaupunkiKoosteKuva(UiKerros kerros)
        {
            kuva = new VisualElement { name = "kaupunkikooste", pickingMode = PickingMode.Ignore };
            kuva.style.position = Position.Absolute;
            kuva.style.left = 0; kuva.style.right = 0; kuva.style.top = 0; kuva.style.bottom = 0;
            kuva.style.unityBackgroundImageTintColor = Color.white;
            kuva.style.display = DisplayStyle.None;
            kerros.Juuri(Kerros).Insert(0, kuva);
            kerros.JokaRuutu += Paivita;
        }

        static RenderTexture Lahde()
        {
            if (!haettu)
            {
                haettu = true;
                lahde = typeof(KaupunkiKoosteKuva).Assembly.GetType("Matkakirja.Linssit.KaupunkiKooste")
                    ?.GetProperty("Kuva", BindingFlags.Public | BindingFlags.Static);
            }
            return lahde?.GetValue(null) as RenderTexture;
        }

        void Paivita()
        {
            var rt = Lahde();
            if (rt == nyt) return;
            nyt = rt;
            if (rt == null) { kuva.style.display = DisplayStyle.None; kuva.style.backgroundImage = StyleKeyword.None; return; }
            kuva.style.backgroundImage = new StyleBackground(Background.FromRenderTexture(rt));
            kuva.style.display = DisplayStyle.Flex;
        }
    }
}
