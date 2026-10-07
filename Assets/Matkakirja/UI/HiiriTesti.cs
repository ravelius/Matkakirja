// HIIRIKLIKKAUS TESTIKOMENNOLLA (Linssiseppä 2, 7.10.2026; omistajan vika Mac TF 160: "Natiivi-appissa Macilla ei voi
// klikata Ateenan kuumailmapalloa"). Sovelluksen sisäinen hiirisyöte Input Systemin kautta: siirto, painallus ja vapautus
// jonoon (InputSystem.QueueStateEvent), jolloin UI Toolkit tekee saman osumatestin kuin oikealla hiirellä. Omistajan
// kursori ei liiku. Ennen klikkausta kirjataan, mikä elementti on pisteessä ylimmässä paneelissa (UiKerros.Poimi):
// pallon nappi = osuma kunnossa, muu (esim. kaupungin kutsukortti) = peitossa.
//   ui hiiri klikkaa <x> <y>   pisteet (Nostot-paneelin koordinaatit, y alas)
//   ui hiiri pallo <id>        pallon kuoren keskelle (KaupunkiPallot.KuorenKeskus)
//   ui hiiri poimi <x> <y>     vain osumatesti
using System.Collections;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.InputSystem.LowLevel;

namespace Matkakirja.Natiivi
{
    public static class HiiriTesti
    {
        /// <summary>Paneelipiste (pt, y alas) näytön pikseleiksi (y ylös) Nostot-paneelin mittakaavalla.</summary>
        static Vector2 Ruutuun(UiKerros kerros, Vector2 pt)
        {
            var juuri = kerros.Juuri(UiKerros.Nostot);
            float w = juuri.panel != null ? juuri.panel.visualTree.layout.width : 0f;
            float s = w > 0f ? Screen.width / w : 1f;
            return new Vector2(pt.x * s, Screen.height - pt.y * s);
        }

        public static string Poimi(UiKerros kerros, Vector2 pt) => kerros.Poimi(Ruutuun(kerros, pt));

        public static string Klikkaa(UiKerros kerros, Vector2 pt)
        {
            var px = Ruutuun(kerros, pt);
            string osuma = kerros.Poimi(px);
            Debug.Log($"MATKAKIRJA hiiri: klikkaus ({pt.x:0},{pt.y:0}) pt = ({px.x:0},{px.y:0}) px, osumatesti: {osuma}");
            kerros.StartCoroutine(Aja(px));
            return $"hiiri: klikkaus ({pt.x:0},{pt.y:0}) pt, osuma {osuma}";
        }

        static IEnumerator Aja(Vector2 px)
        {
            var hiiri = Mouse.current ?? InputSystem.AddDevice<Mouse>();
            InputSystem.QueueStateEvent(hiiri, new MouseState { position = px });
            yield return null;
            yield return null;
            InputSystem.QueueStateEvent(hiiri, new MouseState { position = px }.WithButton(MouseButton.Left, true));
            yield return null;
            yield return null;
            InputSystem.QueueStateEvent(hiiri, new MouseState { position = px }.WithButton(MouseButton.Left, false));
            yield return null;
            Debug.Log($"MATKAKIRJA hiiri: klikkaus valmis ({px.x:0},{px.y:0}) px, laite {hiiri.name}");
        }
    }
}
