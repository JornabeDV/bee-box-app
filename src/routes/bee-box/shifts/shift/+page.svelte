<script>
  import { page } from '$app/stores';
  import { openPopup, loading } from "$stores/store";

  const user = $page.data.user;
console.log(user)
  $: date = $page.url.searchParams.get('date');
  $: time = $page.url.searchParams.get('time');

  async function reserveClass() {
    loading.set(true);
    try {

      const response = await fetch(`/bee-box/api/reservations/${user.id}`, {
        method: "POST",
        body: JSON.stringify({
          date,
          time,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {

        openPopup(AlertPopup, {
          content: 'Reserva confirmada',
          nofixed: true
        }, false);

        window.location.reload();

      } else {
        console.error('Failed to submit message');
      }
    } catch (error) {
      console.error('Error submitting message:', error);
    } finally {
      loading.set(false);
    }
  }
</script>

<h5 class="font-heading font-thin text-light mb-4">Clase del {date} a las {time}</h5>
<button class="bg-primary text-black font-sans px-4 py-2 rounded-full" on:click={reserveClass}>
  Reservar
</button>
