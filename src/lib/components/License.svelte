<script lang="ts">
  let { onclose } = $props();
</script>

<div class="overlay" role="dialog" aria-modal="true" aria-label="License">
  <div class="panel">
    <div class="header">
      <h2>License</h2>
      <button class="close" onclick={onclose} aria-label="Close license panel"
        >&times;</button>
    </div>

    <div class="content">
      <p>
        This software is licensed under the <strong
          >Sustainable Use License</strong
        >.
      </p>
      <div>
        <p class="version">Version 1.0</p>

        <h2>Acceptance</h2>
        <p>
          By using the software, you agree to all of the terms and conditions
          below.
        </p>

        <h2>Copyright License</h2>
        <p>
          The licensor grants you a non-exclusive, royalty-free, worldwide,
          non-sublicensable, non-transferable license to use, copy, distribute,
          make available, and prepare derivative works of the software, in each
          case subject to the limitations below.
        </p>

        <h2>Limitations</h2>
        <p>
          You may use or modify the software only for your own internal business
          purposes or for non-commercial or personal use. You may distribute the
          software or provide it to others only if you do so free of charge for
          non-commercial purposes. You may not alter, remove, or obscure any
          licensing, copyright, or other notices of the licensor in the
          software. Any use of the licensor's trademarks is subject to
          applicable law.
        </p>

        <h2>Patents</h2>
        <p>
          The licensor grants you a license, under any patent claims the
          licensor can license, or becomes able to license, to make, have made,
          use, sell, offer for sale, import and have imported the software, in
          each case subject to the limitations and conditions in this license.
          This license does not cover any patent claims that you cause to be
          infringed by modifications or additions to the software. If you or
          your company make any written claim that the software infringes or
          contributes to infringement of any patent, your patent license for the
          software granted under these terms ends immediately. If your company
          makes such a claim, your patent license ends immediately for work on
          behalf of your company.
        </p>

        <h2>Notices</h2>
        <p>
          You must ensure that anyone who gets a copy of any part of the
          software from you also gets a copy of these terms. If you modify the
          software, you must include in any modified copies of the software a
          prominent notice stating that you have modified the software.
        </p>

        <h2>No Other Rights</h2>
        <p>
          These terms do not imply any licenses other than those expressly
          granted in these terms.
        </p>

        <h2>Termination</h2>
        <p>
          If you use the software in violation of these terms, such use is not
          licensed, and your license will automatically terminate. If the
          licensor provides you with a notice of your violation, and you cease
          all violation of this license no later than 30 days after you receive
          that notice, your license will be reinstated retroactively. However,
          if you violate these terms after such reinstatement, any additional
          violation of these terms will cause your license to terminate
          automatically and permanently.
        </p>

        <h2>No Liability</h2>
        <p>
          As far as the law allows, the software comes as is, without any
          warranty or condition, and the licensor will not be liable to you for
          any damages arising out of these terms or the use or nature of the
          software, under any kind of legal claim.
        </p>

        <h2>Definitions</h2>
        <p>The &#8220;licensor&#8221; is the entity offering these terms.</p>
        <p>
          The &#8220;software&#8221; is the software the licensor makes
          available under these terms, including any portion of it.
        </p>
        <p>
          &#8220;You&#8221; refers to the individual or entity agreeing to these
          terms.
        </p>
        <p>
          &#8220;Your company&#8221; is any legal entity, sole proprietorship,
          or other kind of organization that you work for, plus all
          organizations that have control over, are under the control of, or are
          under common control with that organization. Control means ownership
          of substantially all the assets of an entity, or the power to direct
          its management and policies by vote, contract, or otherwise. Control
          can be direct or indirect.
        </p>
        <p>
          &#8220;Your license&#8221; is the license granted to you for the
          software under these terms.
        </p>
        <p>
          &#8220;Use&#8221; means anything you do with the software requiring
          your license.
        </p>
        <p>
          &#8220;Trademark&#8221; means trademarks, service marks, and similar
          rights.
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  .overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.45);
    z-index: 50;
  }

  .panel {
    background: var(--panel-bg);
    color: var(--text-color);
    padding: 2rem;
    border-radius: 24px;
    width: min(95vw, 760px);
    max-height: min(90vh, 780px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;
    overflow: hidden;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 800;
  }

  .close {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    line-height: 1;
    color: var(--text-color);
    opacity: 0.5;
  }

  .close:hover {
    opacity: 1;
  }

  .content {
    line-height: 1.6;
    font-size: 1rem;
    margin-bottom: 1.5rem;
    max-height: calc(min(90vh, 780px) - 180px);
    overflow-y: auto;
    padding-right: 0.5rem;
  }

  .content::-webkit-scrollbar {
    width: 10px;
  }

  .content::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 999px;
  }

  .content::-webkit-scrollbar-track {
    background: transparent;
  }

  .footer {
    font-size: 0.8rem;
    opacity: 0.6;
    text-align: center;
  }

  a {
    text-decoration: none;
    font-weight: 600;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
