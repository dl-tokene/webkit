<template>
  <div class="app-table__wrp">
    <table class="app-table">
      <thead>
        <slot name="thead" />
      </thead>
      <tbody>
        <slot name="tbody" />
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
.app-table__wrp {
  position: relative;
  overflow: auto auto;
  width: 100%;
  flex: 1;

  @include scrollbar;
}

.app-table {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  th,
  td {
    text-align: left;
    padding: toRem(18) toRem(24) toRem(18) toRem(16);
    color: var(--text-primary-main);
  }

  thead {
    background: var(--bg-primary-dark);

    th {
      font-size: toRem(12);
      line-height: 1.3;
      font-weight: 600;
      letter-spacing: toRem(0.5);
      color: var(--text-secondary-main);
      padding-top: toRem(10);
      padding-bottom: toRem(10);
    }
  }

  tbody {
    tr {
      transition: 0.15s ease-in-out;

      &:hover {
        background: var(--background-primary-dark);
      }
    }

    td {
      vertical-align: middle;
      font-size: toRem(14);
      line-height: 1.5;
      border-bottom: toRem(1) solid var(--border-secondary-main);
    }
  }
}
</style>
