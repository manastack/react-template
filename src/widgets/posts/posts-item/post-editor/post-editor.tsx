import { FC, LegacyRef, memo, useCallback, useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  PropsWithEmotionNaming,
  withEmotionNaming,
} from '@manauser/react-emotion-naming'
import { withRenderLog } from '@manauser/react-render-log'
import { useQueryClient } from '@tanstack/react-query'
import { z, ZodTypeDef } from 'zod'

import { MainQueryKey } from '@app/config'
import {
  PostCreatingDto,
  PostCreatingModel,
  PostsItemReadingDto,
  PostsItemReadingModel,
  PostUpdatingDto,
  PostUpdatingModel,
} from '@entities/post'
import { useUpdating } from '@shared/lib/api'
import { ButtonSymbol } from '@shared/ui/button-symbol'

import {
  StyledPostEditor,
  StyledPostEditorBody,
  StyledPostEditorTitle,
  StyledToolbar,
} from './post-editor.style'

const message = 'This field is required'
const validationSchema = z.object({
  body: z.string().min(1, { message }),
  name: z.string().min(5, { message }),
})

type ValidationSchema = z.infer<typeof validationSchema>

type Props = Omit<PostsItemReadingModel, 'id'> & {
  closePostEditor: () => void
  id?: number
}

const PostEditor: FC<PropsWithEmotionNaming<Props>> = ({
  body,
  closePostEditor,
  id = null,
  name,
  setClassName,
  userId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  })

  type QueryKey = [MainQueryKey, number] | [MainQueryKey]

  const { isLoading, isSuccess, mutate } = useUpdating<
    QueryKey,
    PostUpdatingModel | PostCreatingModel, // RequestModel
    ZodTypeDef, // todo - remove
    PostUpdatingDto | PostCreatingDto, // RequestDto
    PostsItemReadingModel, // ResponseModel
    ZodTypeDef, // todo - remove
    PostsItemReadingDto // ResponseDto
  >({
    queryKey:
      id === null
        ? [MainQueryKey.postCreating]
        : [MainQueryKey.postUpdating, id],
    urlParams: id === null ? [] : [id],
  })

  const nameInput: LegacyRef<HTMLInputElement> | undefined = useRef(null)
  const { ref: nameRef, ...nameRest } = register('name')

  const onSubmit: SubmitHandler<ValidationSchema> = useCallback(
    (data, event) => {
      event?.preventDefault()
      mutate(id === null ? { ...data, userId } : { ...data, id, userId })
    },
    [id, mutate, userId],
  )

  const queryClient = useQueryClient()

  useEffect(() => {
    isSuccess &&
      queryClient.invalidateQueries(['postsReading']).then(closePostEditor)
  }, [closePostEditor, isSuccess, queryClient])

  useEffect(() => {
    nameInput.current?.focus()
  }, [])

  return (
    <StyledPostEditor className={setClassName('PostEditor')}>
      <StyledPostEditorTitle
        className={setClassName('PostEditorTitle', 'mb-2 text-3xl', {
          'bg-red': errors.name,
        })}
        defaultValue={name}
        disabled={isLoading}
        id="name"
        placeholder="Title of the post"
        ref={(event) => {
          nameRef(event)
          // @ts-ignore
          nameInput.current = event
        }}
        {...nameRest}
      />
      {errors.name && (
        <div className="-mt-3 h-3 text-[8px] text-red-500">
          {errors.name?.message}
        </div>
      )}
      <StyledPostEditorBody
        className={setClassName('PostEditorBody', 'mb-2 text-3xl', {
          'bg-red': errors.body,
        })}
        defaultValue={body}
        disabled={isLoading}
        id="body"
        placeholder="Body of the post"
        rows={3}
        wrap="off"
        {...register('body')}
      />
      {errors.body && (
        <div className="-mt-3 h-3 text-[8px] text-red-500">
          {errors.body?.message}
        </div>
      )}
      <StyledToolbar className={setClassName('Toolbar')}>
        <ButtonSymbol
          className="text-[0.7rem] !text-red-500"
          disabled={isLoading}
          handleClick={closePostEditor}
          label="cancel"
          renderLogId={`post-editor.cancel.${id}`}
        />
        <ButtonSymbol
          className="text-[0.7rem] !text-red-500"
          disabled={isLoading || !isValid}
          handleClick={handleSubmit(onSubmit)}
          label="save"
          renderLogId={`post-editor.save.${id}`}
        />
      </StyledToolbar>
    </StyledPostEditor>
  )
}

export default memo(withEmotionNaming(withRenderLog(PostEditor)))
