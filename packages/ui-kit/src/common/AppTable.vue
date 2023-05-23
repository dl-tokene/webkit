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
}

.app-table {
  border-collapse: collapse;
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
    position: sticky;
    top: 0;
    background: var(--background-primary-main);
    border-radius: toRem(14);

    th {
      font-size: toRem(16);
      line-height: 1.5;
      font-weight: 400;
      letter-spacing: toRem(0.15);
      color: var(--text-secondary-main);
      padding-top: toRem(16);
      padding-bottom: toRem(16);
      margin-bottom: toRem(10);
    }
  }

  tbody {
    td {
      vertical-align: middle;
      font-size: toRem(14);
      line-height: 1.5;
      border-bottom: toRem(1) solid var(--border-secondary-main);
    }

    tr {
      transition: 0.15s ease-in-out;

      &:hover {
        background: var(--background-primary-dark);
      }

      &:last-child {
        td {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
